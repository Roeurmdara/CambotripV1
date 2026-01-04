"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation, Autoplay } from "swiper/modules"

const architectureTypes = [
  {
    name: "Temple Architecture",
    category: "Religious",
    image: "/angkor-wat-temple-cambodia-ancient.jpg",
    description: "Khmer temples showcase intricate stone carvings, towering spires, and cosmic symbolism. Built as earthly representations of Mount Meru, they reflect Hindu-Buddhist cosmology.",
  },
  {
    name: "Traditional Stilt Houses",
    category: "Residential",
    image: "https://i.pinimg.com/736x/e6/1a/dd/e61add00aeb28e63c98c07cc886f88ab.jpg",
    description: "Elevated wooden homes protect against flooding and wildlife. The space beneath serves for storage, livestock, and daily activities during hot afternoons.",
  },
  {
    name: "Royal Palace Complex",
    category: "Royal",
    image: "/royal-palace-phnom-penh-cambodia-golden.jpg",
    description: "Golden spires and ornate rooflines define Khmer royal architecture. Each building serves ceremonial purposes, blending French colonial and traditional Khmer elements.",
  },
  {
    name: "City Layout & Planning",
    category: "Urban",
    image: "https://i.pinimg.com/1200x/81/09/ba/8109bac433e45fc951a82068efa22f02.jpg",
    description: "Ancient Khmer cities followed sacred geometry with temples at the center. Water management through barays (reservoirs) sustained large populations and rice cultivation.",
  },
    {
    name: "Colonial Buildings",
    category: "Urban",
    image: "https://i.pinimg.com/736x/bd/85/67/bd8567e90c5199eb23dd5604338c0832.jpg",
    description: "French colonial architecture from the 19th century features high ceilings, tall windows, and decorative balconies, blending Western and Khmer styles.",
  },
  {
    name: "Floating Villages",
    category: "Residential",
    image: "https://i.pinimg.com/1200x/ad/4f/16/ad4f16c95c7c35b66a27c83451f24be7.jpg",
    description: "Villages on Tonle Sap Lake built on stilts or rafts. Homes, schools, and markets float during the wet season, demonstrating adaptive water-based living.",
  },
]

const khmerSymbols = [
  {
    name: "Naga Serpent",
    symbol: "🐉",
    meaning: "Protection and water spirits. Often guards temple entrances, symbolizing the bridge between earth and divine realms.",
  },
  {
    name: "Lotus Flower",
    symbol: "🪷",
    meaning: "Purity and enlightenment. Rises from mud to bloom, representing spiritual awakening in Buddhism.",
  },
  {
    name: "Garuda Bird",
    symbol: "🦅",
    meaning: "Divine mount of Vishnu. Represents power, freedom, and the victory of good over evil.",
  },
  {
    name: "Apsara Dancers",
    symbol: "💃",
    meaning: "Celestial dancers from Hindu mythology. Carved throughout temples, they represent divine beauty and grace.",
  },
]

export default function ArchitectureHeritage() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light text-black tracking-tight mb-3">
            Architecture & Heritage
          </h2>
          <p className="text-gray-500 text-base font-light max-w-2xl">
            From ancient temples to traditional homes, Khmer architecture reflects centuries of cultural evolution and spiritual devotion
          </p>
        </motion.div>

        {/* Architecture Gallery */}
        <div className="relative mb-32">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
            className="mb-16"
          >
            {architectureTypes.map((arch, index) => (
              <SwiperSlide key={arch.name}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                >
                  <div className="group cursor-pointer">
                    {/* Image */}
                    <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-200">
                      <img
                        src={arch.image || "/placeholder.svg"}
                        alt={arch.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-light">
                        {arch.category}
                      </p>
                      <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors">
                        {arch.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">
                        {arch.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-0 top-[35%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 -ml-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-[35%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 -mr-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Khmer Symbols Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-3">
            Sacred Symbols
          </h3>
          <p className="text-gray-500 text-base font-light max-w-2xl mb-16">
            Key symbols found throughout Khmer art and architecture
          </p>
        </motion.div>

        {/* Symbols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {khmerSymbols.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">{item.symbol}</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-light text-black">{item.name}</h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
       
        </motion.div>
      </div>
    </section>
  )
}