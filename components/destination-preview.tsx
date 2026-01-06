"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

const destinations = [
  {
    name: "Angkor Wat",
    location: "Siem Reap",
    image: "/angkor-wat-temple-cambodia-ancient.jpg",
    description: "The largest religious monument in the world",
  },
  {
    name: "Royal Palace",
    location: "Phnom Penh",
    image: "/royal-palace-phnom-penh-cambodia-golden.jpg",
    description: "A stunning example of Khmer architecture",
  },
  {
    name: "Bokor Mountain",
    location: "Kampot",
    image: "/bokor-mountain-cambodia-misty-landscape.jpg",
    description: "Misty peaks and abandoned French colonial buildings",
  },
  {
    name: "Koh Rong",
    location: "Sihanoukville",
    image: "/koh-rong-beach-cambodia-tropical-paradise.jpg",
    description: "Pristine beaches and crystal-clear waters",
  },
  {
    name: "Tonle Sap",
    location: "Siem Reap",
    image: "/angkor-wat-temple-cambodia-ancient.jpg",
    description: "Southeast Asia's largest freshwater lake",
  },
  {
    name: "Kep Beach",
    location: "Kep",
    image: "/koh-rong-beach-cambodia-tropical-paradise.jpg",
    description: "Famous for fresh crab and quiet beaches",
  },
];

export default function DestinationSlider() {
    const router = useRouter()
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
            Destinations
          </h2>
          <p className="text-gray-500 text-base font-light max-w-md">
            Explore Cambodia's most iconic places
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mb-16"
          >
            {destinations.map((destination, index) => (
              <SwiperSlide key={destination.name}>
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
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-light">
                        {destination.location}
                      </p>
                      <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-0 top-[35%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 -ml-6">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-[35%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 -mr-6">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
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
          <button
            onClick={() => router.push("/destinations")}
            className="group inline-flex items-center gap-3 text-black hover:text-gray-600 transition-colors text-sm uppercase tracking-widest font-light border-b border-black hover:border-gray-600 pb-1"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
