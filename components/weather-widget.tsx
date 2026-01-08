"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cloud, CloudRain, Sun, Wind, Droplets, Loader2, CloudDrizzle, CloudSnow, CloudFog } from "lucide-react"

interface WeatherData {
  city: string
  temp: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        
        const cities = [
          { name: "Phnom Penh", lat: 11.5564, lon: 104.9282 },
          { name: "Siem Reap", lat: 13.3633, lon: 103.8564 },
          { name: "Kampot", lat: 10.6104, lon: 104.1781 }
        ]

        const weatherPromises = cities.map(async (city) => {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia/Bangkok`
          )
          
          if (!response.ok) {
            throw new Error(`Failed to fetch weather for ${city.name}`)
          }

          const data = await response.json()
          
          // Map weather codes to descriptions
          const getWeatherDescription = (code: number): string => {
            if (code === 0) return "Clear sky"
            if (code <= 3) return "Partly cloudy"
            if (code <= 48) return "Foggy"
            if (code <= 57) return "Drizzle"
            if (code <= 67) return "Rain"
            if (code <= 77) return "Snow"
            if (code <= 82) return "Rain showers"
            if (code <= 86) return "Snow showers"
            if (code <= 99) return "Thunderstorm"
            return "Clear"
          }

          return {
            city: city.name,
            temp: Math.round(data.current.temperature_2m),
            description: getWeatherDescription(data.current.weather_code),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            icon: data.current.weather_code.toString()
          }
        })

        const results = await Promise.all(weatherPromises)
        setWeatherData(results)
        setError(null)
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError("Failed to load weather data")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    
    // Refresh weather data every 10 minutes
    const interval = setInterval(fetchWeather, 600000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes("rain") || desc.includes("showers")) return CloudRain
    if (desc.includes("drizzle")) return CloudDrizzle
    if (desc.includes("cloud")) return Cloud
    if (desc.includes("fog")) return CloudFog
    if (desc.includes("snow")) return CloudSnow
    if (desc.includes("thunder")) return CloudRain
    return Sun
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-black border border-black dark:border-white rounded-lg p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-black dark:text-white animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-black border border-black dark:border-white rounded-lg p-8 flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Retry
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-black border border-black dark:border-white  p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-black dark:text-white">Current Weather</h3>
        <span className="text-xs text-gray-600 dark:text-gray-400">Live data</span>
      </div>

      <div className="space-y-4">
        {weatherData.map((weather, index) => {
          const WeatherIcon = getWeatherIcon(weather.description)
          return (
            <motion.div
              key={weather.city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-black border border-black dark:border-white p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <WeatherIcon className="w-10 h-10 text-black dark:text-white" />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-black dark:text-white">{weather.city}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{weather.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-black dark:text-white">{weather.temp}°C</div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-700 dark:text-white">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  <span>{weather.windSpeed} km/h</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}