"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  listedOn: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

const data: Gallery4Item[] = [
  {
    id: "angkor-wat",
    title: "Angkor Wat",
    description: "The iconic temple complex of the Khmer Empire, located in Siem Reap.",
    listedOn: "December 14, 1992",
    href: "https://whc.unesco.org/en/list/668/",
    image: "https://i.pinimg.com/1200x/ed/bf/73/edbf7353393cc3d039792dc89a0dd4b6.jpg",
  },
  {
    id: "preah-vihear",
    title: "Preah Vihear Temple",
    description: "A Hindu temple located on a cliff in Preah Vihear Province, known for its spectacular architecture and scenic views.",
    listedOn: "July 7, 2007",
    href: "https://whc.unesco.org/en/list/1224/",
    image: "https://i.pinimg.com/1200x/a1/9c/c4/a19cc40449fd2158340433ae772d272b.jpg",
  },
  {
    id: "sambor-prei-kuk",
    title: "Temple Zone of Sambor Prei Kuk",
    description: "Pre-Angkorian temple complex in Kampong Thom Province, representing 6th–7th century Khmer architecture.",
    listedOn: "July 8, 2017",
    href: "https://whc.unesco.org/en/list/1403/",
    image: "https://www.greeneratravel.com/userfiles/850x450-bakhan.jpg",
  },
  {
    id: "koh-ker",
    title: "Koh Ker",
    description: "Pyramid-shaped temple complex in Preah Vihear Province, showcasing early Khmer imperial architecture.",
    listedOn: "September 17, 2023",
    href: "#",
    image: "https://www.siemreaptaxidrivertours.com/wp-content/uploads/2024/02/KOH-KER-TEMPLE-1024x644.jpeg",
  },
  {
    id: "choeung-ek",
    title: "Choeung Ek Memorial Stupa",
    description: "Buddhist stupa in Phnom Penh, Kampong Speu, and Kampong Chhnang, housing thousands of skulls from Khmer Rouge victims.",
    listedOn: "December 11, 2025",
    href: "#",
    image: "https://asset.tovtrip.com//uploads/0000/99/2023/03/03/photo-2023-02-22-15-53-08.jpg",
  },
  {
    id: "teanh-prot",
    title: "Teanh Prot Game (Tug of War)",
    description: "Traditional cultural sport considered part of Cambodia’s living heritage.",
    listedOn: "December 2, 2015",
    href: "#",
    image: "https://kptmedia.ap-south-1.linodeobjects.com/2025/12/592722844_1269626231858487_7502527578997125106_n.jpg",
  },
  {
    id: "apsara-dance",
    title: "The Royal Ballet of Cambodia (Apsara Dance)",
    description: "Classical dance performed by elegantly dressed dancers representing Apsaras (celestial beings).",
    listedOn: "November 7, 2003",
    href: "#",
    image: "https://i.pinimg.com/1200x/1b/22/43/1b2243617218788ff46b97d8518c979f.jpg",
  },
  {
    id: "sbek-thom",
    title: "Sbèk Thom (Khmer Shadow Theater)",
    description: "Traditional shadow puppetry telling ancient myths and epics.",
    listedOn: "November 25, 2015",
    href: "#",
    image: "https://i.pinimg.com/1200x/33/69/a7/3369a749e55e0f163d09f1c7707bfece.jpg",
  },
  {
    id: "cha-pey-dong-veng",
    title: "Cha Pey Dong Veng",
    description: "Traditional practice requiring protection due to its declining practice.",
    listedOn: "November 30, 2016",
    href: "#",
    image: "https://www.areacambodia.com/wp-content/uploads/2023/11/Maestro-Kong-Nai-a-Chapey-Dang-Veng-virtuoso-collaborates-with-Mr.-Mann-Vannda-a-renowned-Cambodian-rapper-and-hip-hop-artist-famous-for-his-masterpiece-Time-to-Rise-Cambodia.jpg",
  },
  {
    id: "lhorn-wat-svay-andet",
    title: "Shadow Puppet Show (Lhorn Wat Svay Andet)",
    description: "Another traditional form of shadow puppetry in Cambodia, emphasizing local cultural stories.",
    listedOn: "November 28, 2018",
    href: "#",
    image: "https://tourismcambodia.net/wp-content/uploads/2024/08/Lakhon-Khol-Header.jpg",
  },
  {
    id: "kun-lbokator",
    title: "Kun L’Bokator",
    description: "Traditional Khmer martial art combining combat techniques, dance, and rituals.",
    listedOn: "November 29, 2022",
    href: "#",
    image: "https://files.intocambodia.org/wp-content/uploads/2024/08/10122439/Kun-Lbokator-960x576.jpg",
  },
  {
    id: "krama",
    title: "Krama",
    description: "Traditional Cambodian scarf, widely used in daily life, symbolizing cultural identity.",
    listedOn: "December 4, 2024",
    href: "#",
    image: "https://cdn.kiripost.com/static/images/Krama_1.2e16d0ba.fill-960x540.jpg",
  },
];


const Gallery4 = ({
  title = "Cambodia Heritage Sites",
  description = "Explore the rich cultural heritage of Cambodia through these iconic sites that showcase the nation's sites",
  items = data,
}: Gallery4Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < items.length - itemsPerView

  const scrollPrev = () => {
    if (canScrollPrev) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const scrollNext = () => {
    if (canScrollNext) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false)
    const threshold = 50
    
    if (info.offset.x < -threshold && canScrollNext) {
      scrollNext()
    } else if (info.offset.x > threshold && canScrollPrev) {
      scrollPrev()
    }
  }

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  }

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
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
            {title}
          </h2>
          <p className="text-gray-500 text-base font-light max-w-md">
            {description}
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative mb-16">
          <div ref={constraintsRef} className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
                {visibleItems.map((item) => (
                  <div key={item.id}>
                    <a 
                      href={item.href} 
                      className="group cursor-pointer block"
                      onClick={(e) => isDragging && e.preventDefault()}
                    >
                      {/* Image */}
                      <div className="overflow-hidden mb-6 aspect-[4/3] bg-gray-200">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          draggable="false"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-light">
                          UNESCO World Heritage
                        </p>
                        <h3 className="text-2xl font-light text-black group-hover:text-gray-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-light">
                          <span className="font-semibold">Listed on:</span> {item.listedOn}
                        </p>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Custom Navigation Buttons */}
          {canScrollPrev && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollPrev}
              className="absolute left-0 top-[35%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 -ml-6"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          
          {canScrollNext && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollNext}
              className="absolute right-0 top-[35%] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all duration-300 -mr-6"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {Array.from({ length: items.length - itemsPerView + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-black' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
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
          <button className="group inline-flex items-center gap-3 text-black hover:text-gray-600 transition-colors text-sm uppercase tracking-widest font-light border-b border-black hover:border-gray-600 pb-1">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export { Gallery4 }
