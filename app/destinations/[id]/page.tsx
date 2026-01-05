"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Lightbulb,
  ArrowLeft,
  Hotel,
  UtensilsCrossed,
  Navigation2,
  MapPinned,
  AlertCircle,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { getDestination, Destination } from "@/lib/destinations";

export default function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      getDestination(p.id).then((data) => {
        setDestination(data);
        setLoading(false);
      });
    });
  }, [params]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </>
    );
  }

  if (!destination) {
    notFound();
  }

  const openGoogleMaps = () => {
    const { lat, lng } = destination.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={destination.hero_image || destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="relative z-20 w-full px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <Link href="/destinations">
                <button className="mb-8 text-white/90 hover:text-white text-sm font-light tracking-wide transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest mb-4">
                  <MapPin className="w-3 h-3" />
                  {destination.location}
                </div>
                <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
                  {destination.name}
                </h1>
                <div className="flex items-center gap-8 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="font-light">{destination.rating}</span>
                  </div>
                  <span className="text-white/40">·</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-light">{destination.best_time}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">About</h2>
                  <p className="text-gray-700 text-lg font-light leading-loose mb-20">
                    {destination.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Highlights</h2>
                  <div className="space-y-3 mb-20">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                        <p className="text-gray-600 font-light leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {destination.places_to_visit && destination.places_to_visit.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-20"
                  >
                    <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                      <MapPinned className="w-4 h-4" />
                      Places to Visit
                    </h2>
                    <div className="space-y-10">
                      {destination.places_to_visit.map((place, index) => (
                        <div key={index} className="border-b border-gray-100 pb-8">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-light">{place.name}</h3>
                            <span className="text-xs text-gray-400 uppercase tracking-wider">{place.type}</span>
                          </div>
                          <p className="text-gray-600 font-light leading-relaxed">{place.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {destination.accommodations && destination.accommodations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-20"
                  >
                    <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                      <Hotel className="w-4 h-4" />
                      Where to Stay
                    </h2>
                    <div className="space-y-10">
                      {destination.accommodations.map((accommodation, index) => (
                        <div key={index} className="border-b border-gray-100 pb-8">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-light mb-1">{accommodation.name}</h3>
                              <p className="text-sm text-gray-500">{accommodation.price}</p>
                            </div>
                            <span className="text-xs text-gray-400 uppercase tracking-wider">
                              {accommodation.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {destination.restaurants && destination.restaurants.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-20"
                  >
                    <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4" />
                      Where to Eat
                    </h2>
                    <div className="space-y-10">
                      {destination.restaurants.map((restaurant, index) => (
                        <div key={index} className="border-b border-gray-100 pb-8">
                          <h3 className="text-xl font-light mb-2">{restaurant.name}</h3>
                          <p className="text-sm text-gray-400 mb-3">
                            {restaurant.cuisine} · {restaurant.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {destination.transportation && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mb-20"
                  >
                    <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
                      <Navigation2 className="w-4 h-4" />
                      Getting Around
                    </h2>
                    <div className="space-y-8">
                      <div className="border-b border-gray-100 pb-6">
                        <h3 className="text-sm text-gray-500 mb-3">Getting There</h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                          {destination.transportation.gettingThere}
                        </p>
                      </div>
                      <div className="border-b border-gray-100 pb-6">
                        <h3 className="text-sm text-gray-500 mb-3">Getting Around</h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                          {destination.transportation.gettingAround}
                        </p>
                      </div>
                      <div className="border-b border-gray-100 pb-6">
                        <h3 className="text-sm text-gray-500 mb-3">Typical Costs</h3>
                        <p className="text-gray-600 font-light leading-relaxed">{destination.transportation.costs}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Travel Tips</h2>
                  <div className="space-y-3 mb-20">
                    {destination.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                        <p className="text-gray-600 font-light leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {destination.health_and_safety && destination.health_and_safety.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Health & Safety
                    </h2>
                    <div className="space-y-3">
                      {destination.health_and_safety.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                          <p className="text-gray-600 font-light leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-24"
                >
                  <div className="border border-gray-200 p-8 mb-6">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6">Quick Info</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Location</p>
                        <p className="text-gray-700 font-light">{destination.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Best Time</p>
                        <p className="text-gray-700 font-light">{destination.best_time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Rating</p>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 font-light">{destination.rating} / 5</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Coordinates</p>
                        <p className="text-gray-700 font-light text-sm font-mono">
                          {destination.coordinates.lat}, {destination.coordinates.lng}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={openGoogleMaps}
                      className="w-full py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation2 className="w-4 h-4" />
                      Get Directions
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {destination.gallery && destination.gallery.length > 0 && (
          <section className="py-24 px-6 border-t border-gray-200">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs uppercase tracking-widest text-gray-400 mb-12 text-center flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Gallery
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {destination.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="aspect-[4/3] overflow-hidden"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}