"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MapPin, Clock, Star } from "lucide-react"
import Navigation from "@/components/navigation"

const destinations = [
  {
    id: "1",
    name: "Angkor Wat",
    location: "Siem Reap",
    image: "/angkor-wat-temple-cambodia-ancient.jpg",
    description: "The largest religious monument in the world and a UNESCO World Heritage site",
    bestTime: "November to March",
    rating: 5,
    highlights: ["Ancient temples", "Sunrise views", "Khmer architecture"],
  },
  {
    id: "royal-palace",
    name: "Royal Palace",
    location: "Phnom Penh",
    image: "/royal-palace-phnom-penh-cambodia-golden.jpg",
    description: "A stunning example of Khmer architecture with golden spires and ornate details",
    bestTime: "November to February",
    rating: 4.8,
    highlights: ["Silver Pagoda", "Throne Hall", "Royal gardens"],
  },
  {
    id: "bokor-mountain",
    name: "Bokor Mountain",
    location: "Kampot",
    image: "/bokor-mountain-cambodia-misty-landscape.jpg",
    description: "Misty peaks and abandoned French colonial buildings create an eerie atmosphere",
    bestTime: "December to April",
    rating: 4.5,
    highlights: ["Mountain views", "Colonial ruins", "Cool climate"],
  },
  {
    id: "koh-rong",
    name: "Koh Rong",
    location: "Sihanoukville",
    image: "/koh-rong-beach-cambodia-tropical-paradise.jpg",
    description: "Pristine beaches with crystal-clear waters and bioluminescent plankton",
    bestTime: "November to May",
    rating: 4.7,
    highlights: ["White sand beaches", "Snorkeling", "Island life"],
  },
  {
    id: "bayon-temple",
    name: "Bayon Temple",
    location: "Siem Reap",
    image: "/bayon-temple-faces-cambodia-angkor.jpg",
    description: "Famous for its massive stone faces and intricate bas-reliefs",
    bestTime: "November to March",
    rating: 4.9,
    highlights: ["Stone faces", "Ancient carvings", "Sunset views"],
  },
  {
    id: "tonle-sap",
    name: "Tonle Sap Lake",
    location: "Siem Reap",
    image: "/tonle-sap-floating-village-cambodia.jpg",
    description: "Southeast Asia's largest freshwater lake with floating villages",
    bestTime: "August to October",
    rating: 4.3,
    highlights: ["Floating villages", "Local life", "Boat tours"],
  },
  {
    id: "kep",
    name: "Kep",
    location: "Kep Province",
    image: "/kep-crab-market-cambodia-seafood.jpg",
    description: "A quiet coastal town famous for its fresh crab and pepper farms",
    bestTime: "November to April",
    rating: 4.4,
    highlights: ["Fresh seafood", "Pepper plantations", "Beach relaxation"],
  },
  {
    id: "mondulkiri",
    name: "Mondulkiri",
    location: "Eastern Cambodia",
    image: "/mondulkiri-elephant-sanctuary-cambodia.jpg",
    description: "Rolling hills, waterfalls, and ethical elephant sanctuaries",
    bestTime: "November to February",
    rating: 4.6,
    highlights: ["Elephant sanctuary", "Waterfalls", "Hill tribes"],
  },
]

export default function DestinationsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-background z-10" />
            <img
              src="/cambodia-map-destinations-overview.jpg"
              alt="Cambodia destinations"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 text-center px-4"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4">Explore Destinations</h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover the most captivating places across Cambodia
            </p>
          </motion.div>
        </section>

        {/* Destinations Grid */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/destinations/${destination.id}`}>
                    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={destination.image || "/placeholder.svg"}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="text-sm font-medium text-foreground">{destination.rating}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                          <MapPin className="w-4 h-4" />
                          {destination.location}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                          <Clock className="w-4 h-4" />
                          <span>Best: {destination.bestTime}</span>
                        </div>
                        <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                          <span className="text-sm font-medium mr-2">Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
