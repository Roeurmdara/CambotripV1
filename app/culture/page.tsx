"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import FoodGallery from "@/components/food-gallery";
import FestivalTimeline from "@/components/festival-timeline";
import { Utensils, Calendar, Users, Heart } from "lucide-react";
import HandicraftsGallery from "@/components/HandicraftsGallery";
import ArchitectureHeritage from "@/components/ArchitectureHeritage";
import CambodiaEtiquette from "@/components/CambodiaEtiquette";

const traditions = [
  {
    icon: Utensils,
    title: "Khmer Cuisine",
    description:
      "Cambodian food is a delicate balance of sweet, sour, salty, and bitter flavors. Rice is the staple, accompanied by fish, vegetables, and aromatic herbs.",
  },
  {
    icon: Calendar,
    title: "Festivals",
    description:
      "Cambodia celebrates numerous festivals throughout the year, from the Water Festival to Khmer New Year, each with unique traditions and ceremonies.",
  },
  {
    icon: Users,
    title: "Customs",
    description:
      "Respect for elders, the traditional greeting 'sampeah', and removing shoes before entering homes are important cultural practices.",
  },
  {
    icon: Heart,
    title: "Buddhism",
    description:
      "Theravada Buddhism shapes daily life in Cambodia, with monks playing a central role in communities and colorful temples dotting the landscape.",
  },
];

const etiquette = [
  {
    title: "Greetings",
    tip: "Use the 'sampeah' - press your palms together and bow slightly. The higher the hands, the more respect shown.",
  },
  {
    title: "Dress Code",
    tip: "Dress modestly when visiting temples. Cover shoulders and knees. Remove shoes before entering homes and temples.",
  },
  {
    title: "Respect for Monks",
    tip: "Women should not touch monks or hand them objects directly. Monks are highly respected in Cambodian society.",
  },
  {
    title: "Head and Feet",
    tip: "The head is sacred, don't touch anyone's head. Feet are considered unclean, don't point them at people or Buddha images.",
  },
  {
    title: "Public Behavior",
    tip: "Avoid public displays of affection. Keep your voice down and remain calm, as loud or aggressive behavior is frowned upon.",
  },
  {
    title: "Photography",
    tip: "Always ask permission before photographing people, especially monks. Some temple areas prohibit photography.",
  },
];

export default function CulturePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen dark:bg-black">
        {/* Hero Section */}
        <section className="relative h-[700px] flex items-center justify-center overflow-hiddend dark:bg-black">
          <div className="absolute inset-0">
            <img
              src="https://i.pinimg.com/1200x/65/1c/e3/651ce30b77dddd7b5f6485b7d60b84dc.jpg"
              alt="Cambodian culture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-light text-white mb-6 tracking-tight dark:text-white">
              Culture & Heritage
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light">
              Discover the soul of Cambodia
            </p>
          </motion.div>
        </section>

        {/* Intro Text */}
        <section className="py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90">
              Cambodia's culture is a tapestry woven from centuries of
              tradition, spirituality, and resilience. From ancient temples to
              vibrant festivals, experience a way of life shaped by faith,
              family, and flavor.
            </p>
          </motion.div>
        </section>

        {/* Traditions Grid */}
        <section className="py-20 px-4 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {traditions.map((tradition, index) => (
                <motion.div
                  key={tradition.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background p-8 group hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  <tradition.icon className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-serif text-2xl font-light mb-4">
                    {tradition.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                    {tradition.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Food Gallery */}
        <section className=" px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <FoodGallery />
          </div>
        </section>

        {/* Festival Timeline */}
        <section className="py-24 px-4 ">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-light text-black tracking-tight mb-3 dark:text-white">
                Khmer Cultural Festivals
              </h2>
              <p className="text-gray-500 text-base font-light max-w-md">
                Celebrate the vibrant festivals that bring Cambodia's culture to
                life
              </p>
            </motion.div>
            <FestivalTimeline />
          </div>
        </section>

        {/* Cultural Etiquette */}

        {/* Food Gallery */}
        <section className=" px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <CambodiaEtiquette />
          </div>
        </section>
        {/* Food Gallery */}
        <section className=" px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <HandicraftsGallery />
          </div>
        </section>
        <section className=" px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <ArchitectureHeritage />
          </div>
        </section>
      </main>
    </>
  );
}
