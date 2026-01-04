"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation, Autoplay } from "swiper/modules"

const dishes = [
  {
    name: "Fish Amok",
    category: "Main Course",
    image: "https://i.pinimg.com/1200x/87/38/4a/87384ae90057fc7f1ad80e51a4d58c33.jpg",
    description: "Cambodia's national dish - a creamy fish curry steamed in banana leaves with coconut milk, lemongrass, and aromatic spices.",
  },
  {
    name: "Lok Lak",
    category: "Main Course",
    image: "https://i.pinimg.com/1200x/da/71/53/da71533386a64ddd152e1a29db447485.jpg",
    description: "Stir-fried beef marinated in oyster sauce and served with rice, fresh vegetables, and a lime-pepper dipping sauce.",
  },
  {
    name: "Num Banh Chok",
    category: "Breakfast",
    image: "https://i.pinimg.com/1200x/bd/1f/97/bd1f977295a8cbb182364e54bf120114.jpg",
    description: "Traditional Khmer noodles served with a fish-based green curry gravy and fresh vegetables. A popular breakfast dish.",
  },
  {
    name: "Bai Sach Chrouk",
    category: "Breakfast",
    image: "https://i.pinimg.com/736x/13/5c/3b/135c3b331c483984dbe74e38b5278ff2.jpg",
    description: "Grilled pork with broken rice, pickled vegetables, and a side of chicken broth. A beloved breakfast staple.",
  },
  {
    name: "Nom Krok",
    category: "Dessert",
    image: "https://i.pinimg.com/736x/97/68/24/9768242adbf1ce2c1891363c175b06d8.jpg",
    description: "Sweet coconut rice cakes cooked in a special pan, crispy on the outside and soft inside. A popular street snack.",
  },
  {
    name: "Kuy Teav",
    category: "Breakfast",
    image: "https://i.pinimg.com/1200x/d9/56/64/d95664a559ef1ef0611c9623f05a55f8.jpg",
    description: "Traditional rice noodle soup with pork, shrimp, and fresh herbs. A beloved morning meal across Cambodia.",
  },
  {
    name: "Cha Houy Teuk",
    category: "Dessert",
    image: "https://holidaytoindochina.com/webroot/img/images/post_categories/Cha-houy-teuk.jpg",
    description: "A jelly-like dessert made from agar-agar or grass jelly, served with coconut milk and palm sugar syrup. Refreshing and sweet.",
  },
  {
    name: "Samlor Korkor",
    category: "Main Course",
    image: "https://www.196flavors.com/wp-content/uploads/2018/08/Samlor-Kako-3-FP.jpg",
    description: "A hearty Cambodian vegetable and meat soup, traditionally cooked with fermented fish paste. A classic comfort dish.",
  },
  {
    name: "Banh Chhev",
    category: "Snack",
    image: "https://images.deliveryhero.io/image/fd-kh/LH/uvr1-listing.JPG",
    description: "Crispy Cambodian crepes filled with mung beans, coconut, and minced pork. Commonly sold as a street snack.",
  },
  {
    name: "Trey Khmer Prahok",
    category: "Main Course",
    image: "https://walkaboutmonkey.com/wp-content/uploads/2019/02/Prahok-Ktiss2-optimized.jpg",
    description: "Fish cooked with prahok (fermented fish paste) and herbs. Strongly flavored and iconic in Khmer cuisine.",
  }
  
];


export default function FoodGallery() {
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
            Khmer Cuisine
          </h2>
          <p className="text-gray-500 text-base font-light max-w-md">
            Discover the rich flavors of Cambodia
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
            {dishes.map((dish, index) => (
              <SwiperSlide key={dish.name}>
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
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-light">
                        {dish.category}
                      </p>
                      <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">
                        {dish.description}
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
            View All Dishes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}