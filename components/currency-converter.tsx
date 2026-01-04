"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRightLeft, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/currency")

        if (!response.ok) {
          throw new Error("Failed to fetch currency data")
        }

        const data = await response.json()
        setRate(data.rate)
        setLastUpdated(new Date(data.date).toLocaleDateString())
      } catch (err) {
        console.error("Currency fetch error:", err)
        // Use approximate rate on error
        setRate(4100)
        setLastUpdated(new Date().toLocaleDateString())
      } finally {
        setLoading(false)
      }
    }

    fetchRate()
  }, [])

  const convertedAmount = rate ? (Number.parseFloat(amount || "0") * rate).toFixed(2) : "0"

  const handleSwap = () => {
    if (rate) {
      const usdAmount = (Number.parseFloat(amount || "0") / rate).toFixed(2)
      setAmount(usdAmount)
    }
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
      <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Currency Converter</h3>

      <div className="space-y-6">
        {/* USD Input */}
        <div className="bg-background border border-border rounded-lg p-4">
          <label className="text-sm text-muted-foreground mb-2 block">US Dollar (USD)</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl">$</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="rounded-full border-border hover:border-primary hover:bg-primary/10 bg-transparent"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* KHR Output */}
        <div className="bg-background border border-border rounded-lg p-4">
          <label className="text-sm text-muted-foreground mb-2 block">Cambodian Riel (KHR)</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl">៛</span>
            <div className="text-2xl font-bold text-foreground">{convertedAmount}</div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Exchange Rate:</span>
            <span className="font-medium text-foreground">1 USD = {rate?.toFixed(2)} KHR</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span>Last updated:</span>
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* Quick Conversions */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Reference</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[1, 5, 10, 20, 50, 100].map((value) => (
              <div key={value} className="flex justify-between bg-background rounded px-3 py-2">
                <span className="text-muted-foreground">${value}</span>
                <span className="font-medium text-foreground">៛{rate ? (value * rate).toFixed(0) : "0"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
