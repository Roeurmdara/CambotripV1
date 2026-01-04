"use client"

import { motion } from "framer-motion"

const highlights = [
  {
    title: "Khmer Cuisine",
    description: "Discover the rich flavors of traditional Cambodian dishes",
    image: "/khmer-amok-fish-cambodian-food-traditional.jpg",
  },
  {
    title: "Ancient Traditions",
    description: "Experience centuries-old customs and ceremonies",
    image: "/cambodian-apsara-dance-traditional-culture.jpg",
  },
  {
    title: "Festivals",
    description: "Join vibrant celebrations throughout the year",
    image: "/water-festival-cambodia-boat-race-celebration.jpg",
  },
]

export default function CultureHighlight() {
  return (
    <section className="py-24 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">Culture & Heritage</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in the rich cultural tapestry of Cambodia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/2]">
                <img
                  src={highlight.image || "/placeholder.svg"}
                  alt={highlight.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {highlight.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
