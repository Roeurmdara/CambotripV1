"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRightLeft, Loader2 } from "lucide-react"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setLoading(true)
        // Using exchangerate-api.com free API
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")

        if (!response.ok) {
          throw new Error("Failed to fetch currency data")
        }

        const data = await response.json()
        setRate(data.rates.KHR)
        setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleDateString())
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
    
    // Refresh rate every hour
    const interval = setInterval(fetchRate, 3600000)
    return () => clearInterval(interval)
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
      <div className="bg-white dark:bg-black border border-black dark:border-white  p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-black dark:text-white animate-spin" />
      </div>
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
      <h3 className="font-serif text-2xl font-bold text-black dark:text-white mb-6">Currency Converter</h3>

      <div className="space-y-6">
        {/* USD Input */}
        <div className="bg-white dark:bg-black border border-black dark:border-white  p-4">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">US Dollar (USD)</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-black dark:text-white">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold bg-transparent text-black dark:text-white border-0 outline-none w-full"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="rounded-full border border-black dark:border-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 p-3 transition-colors"
          >
            <ArrowRightLeft className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        {/* KHR Output */}
        <div className="bg-white dark:bg-black border border-black dark:border-white  p-4">
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Cambodian Riel (KHR)</label>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-black dark:text-white">៛</span>
            <div className="text-2xl font-bold text-black dark:text-white">{convertedAmount}</div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="bg-gray-100 dark:bg-gray-900 border border-black dark:border-white  p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Exchange Rate:</span>
            <span className="font-medium text-black dark:text-white">1 USD = {rate?.toFixed(2)} KHR</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>Last updated:</span>
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* Quick Conversions */}
        <div>
          <h4 className="text-sm font-medium text-black dark:text-white mb-3">Quick Reference</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[1, 5, 10, 20, 50, 100].map((value) => (
              <div key={value} className="flex justify-between bg-gray-50 dark:bg-gray-900 border border-black dark:border-white  px-3 py-2">
                <span className="text-gray-600 dark:text-gray-400">${value}</span>
                <span className="font-medium text-black dark:text-white">៛{rate ? (value * rate).toFixed(0) : "0"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}