"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation, Autoplay } from "swiper/modules"

const handicrafts = [
  {
    name: "Silk Weaving",
    category: "Textiles",
    image: "https://i.pinimg.com/1200x/0f/4d/93/0f4d933283bcff58eeda10537c9ebf98.jpg",
    description: "Traditional Cambodian silk weaving creates intricate patterns using ancient techniques. Worn in royal ceremonies and special occasions, each design tells a story of Khmer heritage.",
  },
  {
    name: "Krama Textiles",
    category: "Textiles",
    image: "https://i.pinimg.com/1200x/4f/86/f9/4f86f9f98ab6fd63982e8d804667a9a6.jpg",
    description: "The iconic checkered Krama scarf is a symbol of Cambodian identity. Hand-woven with cotton or silk, it's used daily for everything from fashion to practical purposes.",
  },
  {
    name: "Khmer Pottery",
    category: "Pottery",
    image: "https://i.pinimg.com/1200x/2e/0c/f8/2e0cf809e5aecb626577d4f544b0e200.jpg",
    description: "Ancient pottery techniques passed down through generations. From cooking vessels to decorative pieces, each region has its distinct style and firing methods.",
  },
  {
    name: "Wood Carving",
    category: "Wood Carving",
    image: "https://i.pinimg.com/1200x/73/df/58/73df58674ad3b925edfe0e0de8cbbce0.jpg",
    description: "Intricate wood carvings depicting mythological scenes and floral patterns. Master craftsmen create everything from temple decorations to household furniture using traditional tools.",
  },
  {
    name: "Silver Jewelry",
    category: "Silverwork",
    image: "https://cambodiatravel.com/images/2020/10/Silver-cambodia.jpg",
    description: "Traditional silverwork featuring intricate filigree and repoussé techniques. Each piece carries cultural symbolism, from protective amulets to ceremonial ornaments.",
  },
  {
    name: "Gold Leaf Art",
    category: "Jewelry",
    image: "https://i.pinimg.com/1200x/03/fe/2f/03fe2f20796d6887f86e5d536d73b0fe.jpg",
    description: "Delicate gold leaf application adorns Buddhist statues and temple architecture. This meticulous craft requires steady hands and deep spiritual devotion.",
  },
]

export default function HandicraftsGallery() {
  return (
    <section className="py-32 px-6 bg-white">
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
            Handicrafts & Artisan Work
          </h2>
          <p className="text-gray-500 text-base font-light max-w-md">
            Explore Cambodia's rich tradition of craftsmanship
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <div className="relative">
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
            {handicrafts.map((craft, index) => (
              <SwiperSlide key={craft.name}>
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
                        src={craft.image || "/placeholder.svg"}
                        alt={craft.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-light">
                        {craft.category}
                      </p>
                      <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors">
                        {craft.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">
                        {craft.description}
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

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
          <button className="group inline-flex items-center gap-3 text-black hover:text-gray-600 transition-colors text-sm uppercase tracking-widest font-light border-b border-black hover:border-gray-600 pb-1">
            View All Crafts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}