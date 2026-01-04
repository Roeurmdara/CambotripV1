import { NextResponse } from "next/server"

const cities = ["Phnom Penh", "Siem Reap", "Kampot"]

export async function GET() {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY

    if (!API_KEY) {
      // Return mock data if no API key is set
      return NextResponse.json(
        cities.map((city) => ({
          city,
          temp: Math.floor(Math.random() * 10) + 28,
          description: "Sunny",
          humidity: 70,
          windSpeed: 10,
          icon: "01d",
        })),
      )
    }

    const promises = cities.map(async (city) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},KH&units=metric&appid=${API_KEY}`,
        { next: { revalidate: 1800 } }, // Cache for 30 minutes
      )

      if (!response.ok) {
        return {
          city,
          temp: Math.floor(Math.random() * 10) + 28,
          description: "Sunny",
          humidity: 70,
          windSpeed: 10,
          icon: "01d",
        }
      }

      const data = await response.json()
      return {
        city,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        icon: data.weather[0].icon,
      }
    })

    const results = await Promise.all(promises)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Weather API error:", error)
    // Return mock data on error
    return NextResponse.json(
      cities.map((city) => ({
        city,
        temp: Math.floor(Math.random() * 10) + 28,
        description: "Sunny",
        humidity: 70,
        windSpeed: 10,
        icon: "01d",
      })),
    )
  }
}
