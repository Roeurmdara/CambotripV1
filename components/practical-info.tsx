"use client"

import { motion } from "framer-motion"
import { Cloud, DollarSign, Map, Info } from "lucide-react"

const infoCards = [
  {
    icon: Cloud,
    title: "Weather",
    description: "Check current conditions",
    link: "/weather",
  },
  {
    icon: DollarSign,
    title: "Currency",
    description: "USD to KHR converter",
    link: "/currency",
  },
  {
    icon: Map,
    title: "Interactive Map",
    description: "Explore destinations",
    link: "/map",
  },
  {
    icon: Info,
    title: "Travel Tips",
    description: "Essential information",
    link: "/tips",
  },
]

export default function PracticalInfo() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">Plan Your Journey</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know before you go
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10">
                <card.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
