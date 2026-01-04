"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cloud, CloudRain, Sun, Wind, Droplets, Loader2 } from "lucide-react"

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
        const response = await fetch("/api/weather")

        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const data = await response.json()
        setWeatherData(data)
        setError(null)
      } catch (err) {
        console.error("Weather fetch error:", err)
        setError("Using sample data")
        // Set mock data on error
        setWeatherData([
          { city: "Phnom Penh", temp: 32, description: "Sunny", humidity: 70, windSpeed: 10, icon: "01d" },
          { city: "Siem Reap", temp: 31, description: "Partly Cloudy", humidity: 65, windSpeed: 8, icon: "02d" },
          { city: "Kampot", temp: 30, description: "Clear", humidity: 75, windSpeed: 12, icon: "01d" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes("rain")) return CloudRain
    if (desc.includes("cloud")) return Cloud
    return Sun
  }

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-foreground">Current Weather</h3>
        {error && <span className="text-xs text-muted-foreground">{error}</span>}
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
              className="bg-background border border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <WeatherIcon className="w-10 h-10 text-primary" />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-foreground">{weather.city}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{weather.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">{weather.temp}°C</div>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
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
