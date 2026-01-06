"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
}

export default function DestinationSlider() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name, location, image, description")
        .limit(6);

      if (!error && data) {
        setDestinations(data);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section className="py-32 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-light text-black dark:text-white mb-3">
            Destinations
          </h2>
          <p className="text-gray-500 dark:text-gray-300 font-light">
            Explore Cambodia's most iconic places
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={32}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={destination.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/destinations/${destination.id}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-200 dark:bg-gray-800 ">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {destination.location}
                  </p>
                  <h3 className="text-2xl font-light text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light line-clamp-2">
                    {destination.description}
                  </p>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => router.push("/destinations")}
            className="group inline-flex items-center gap-3 text-black dark:text-white border-b border-black dark:border-white hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-600 dark:hover:border-gray-300 transition"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </section>
  );
}
