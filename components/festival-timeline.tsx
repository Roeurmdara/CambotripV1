"use client"

import { motion } from "framer-motion"

const festivals = [
  {
    month: "January",
    name: "Chinese New Year",
    description:
      "Celebrated by the Chinese-Cambodian community with vibrant dragon dances, fireworks, and family gatherings.",
    duration: "3 days",
    startDay: 21,
    endDay: 23,
    location: "Nationwide, especially Phnom Penh",
    image: "https://i.pinimg.com/736x/be/ce/b5/beceb50067ee77bf4151517ad6ba9ae7.jpg",
  },
  {
    month: "April",
    name: "Khmer New Year",
    description:
      "The most important holiday in Cambodia, marking the end of harvest season and the beginning of the new year.",
    duration: "3-4 days",
    startDay: 13,
    endDay: 16,
    location: "Nationwide",
    image: "https://i.pinimg.com/1200x/b4/97/f5/b497f5d28b4b24eb8f9472a7c0d8a7c5.jpg",
  },
  {
    month: "May",
    name: "Royal Ploughing Ceremony",
    description:
      "An ancient Brahman ritual to mark the beginning of the rice-growing season, presided over by the royal family.",
    duration: "1 day",
    startDay: 10,
    endDay: 10,
    location: "Royal Palace, Phnom Penh",
    image: "https://i.pinimg.com/1200x/30/07/79/3007798f3fa3f55d7b249835eca916d4.jpg",
  },
  {
    month: "May",
    name: "Visak Bochea",
    description:
      "The holiest day in Buddhism, celebrating the birth, enlightenment, and death of Buddha.",
    duration: "1 day",
    startDay: 24,
    endDay: 24,
    location: "All temples nationwide",
    image: "https://i.pinimg.com/1200x/e0/c0/e1/e0c0e117f93e694ee3afdb4283f32d05.jpg",
  },
  {
    month: "September-October",
    name: "Pchum Ben",
    description:
      "A 15-day religious festival honoring deceased ancestors, with offerings made at pagodas across the country.",
    duration: "15 days",
    startDay: 25,
    endDay: 9,
    location: "All pagodas nationwide",
    image: "https://i.pinimg.com/1200x/97/10/d8/9710d8ac76f2664dce25b9360306617a.jpg",
  },
  {
    month: "November",
    name: "Water Festival (Bon Om Touk)",
    description:
      "Celebrates the reversal of the Tonle Sap River with spectacular boat races, fireworks, and illuminated floats.",
    duration: "3 days",
    startDay: 5,
    endDay: 7,
    location: "Phnom Penh riverfront",
    image: "https://i.pinimg.com/736x/5c/57/33/5c5733eeea8087f222ef262925eb161a.jpg",
  },
  {
    month: "November",
    name: "Independence Day",
    description: "Commemorates Cambodia's independence from France in 1953 with parades and celebrations.",
    duration: "1 day",
    startDay: 9,
    endDay: 9,
    location: "Independence Monument, Phnom Penh",
    image: "https://i.pinimg.com/1200x/a7/da/c1/a7dac1281c34bfd476cd7963db6eb1e5.jpg",
  },

]

export default function FestivalTimeline() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {festivals.map((festival, index) => (
        <motion.div
          key={festival.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="group block"
        >
          <div className="relative h-70 overflow-hidden mb-4">
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
          
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              {festival.month}.{festival.startDay}-{festival.endDay}
            </div>
            
            <h2 className="font-serif text-xl font-medium group-hover:text-muted-foreground transition-colors">
              {festival.name}
            </h2>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {festival.description}
            </p>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
              <span>{festival.duration}</span>
              <span>·</span>
              <span>{festival.location}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
