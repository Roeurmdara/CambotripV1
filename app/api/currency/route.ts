import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json({
        rate: 4100,
        date: new Date().toISOString(),
      })
    }

    const data = await response.json()
    return NextResponse.json({
      rate: data.rates.KHR || 4100,
      date: data.date,
    })
  } catch (error) {
    console.error("Currency API error:", error)
    return NextResponse.json({
      rate: 4100,
      date: new Date().toISOString(),
    })
  }
}
