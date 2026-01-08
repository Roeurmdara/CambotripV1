"use client";

import Navigation from "@/components/navigation";
import WeatherWidget from "@/components/weather-widget";
import CurrencyConverter from "@/components/currency-converter";
import { Phone, MapPin, AlertCircle, Plane, Hotel } from "lucide-react";

const essentialInfo = [
  {
    icon: Phone,
    title: "Emergency Numbers",
    items: [
      "Police: 117",
      "Fire: 118",
      "Ambulance: 119",
      "Tourist Police: 012 942 484",
    ],
  },
  {
    icon: MapPin,
    title: "Getting Around",
    items: [
      "Tuk-tuk: $1-3 per ride",
      "Taxi: $5-10 per trip",
      "Motorbike rental: $5-7/day",
      "Grab app available",
    ],
  },
  {
    icon: Plane,
    title: "Visa Information",
    items: [
      "Tourist visa: $30 (30 days)",
      "E-visa available online",
      "Visa on arrival at airports",
      "Passport valid 6+ months",
    ],
  },
  {
    icon: Hotel,
    title: "Accommodation",
    items: [
      "Budget: $5-15/night",
      "Mid-range: $20-50/night",
      "Luxury: $100+/night",
      "Book in advance for peak season",
    ],
  },
];

const languagePhrases = [
  { khmer: "ជំរាបសួរ", phonetic: "Jum reap suor", english: "Hello" },
  { khmer: "អរគុណ", phonetic: "Aw kohn", english: "Thank you" },
  { khmer: "សូមទោស", phonetic: "Som toh", english: "Excuse me / Sorry" },
  {
    khmer: "បាទ / ចាស",
    phonetic: "Baat / Jaa",
    english: "Yes (male / female)",
  },
  { khmer: "ទេ", phonetic: "Teh", english: "No" },
  { khmer: "តម្លៃប៉ុន្មាន?", phonetic: "Tlay ponman?", english: "How much?" },
];

const safetyTips = [
  {
    title: "Health",
    tip: "Drink bottled water, use mosquito repellent, and consider travel insurance. Vaccinations recommended.",
  },
  {
    title: "Scams",
    tip: "Agree on prices before services, be wary of overly friendly strangers, and keep valuables secure.",
  },
  {
    title: "Traffic",
    tip: "Roads can be chaotic. Always wear a helmet on motorbikes and be extra cautious when crossing streets.",
  },
  {
    title: "Sun Protection",
    tip: "Cambodia is hot and sunny. Use high SPF sunscreen, wear a hat, and stay hydrated throughout the day.",
  },
  {
    title: "Landmines",
    tip: "Stick to marked paths in rural areas. Some regions still have unexploded ordnance from past conflicts.",
  },
  {
    title: "Valuables",
    tip: "Use hotel safes, avoid displaying expensive items, and keep copies of important documents separately.",
  },
];

export default function PracticalPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-white dark:bg-black text-black dark:text-white">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://i.pinimg.com/1200x/1e/7f/96/1e7f96d879c6418891c51bf63dc27d7d.jpg"
              alt="Cambodia practical information"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 " />
          </div>
          <div className="relative z-20 text-center px-4">
          
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Live Data Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-300 dark:border-white">
              <h2 className="text-2xl font-light">Live Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherWidget />
              <CurrencyConverter />
            </div>
          </div>

          {/* Essential Information */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-black dark:border-white">
              <h2 className="text-2xl font-light">Essential Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {essentialInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="border border-black dark:border-white  p-6  dark:bg-black"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                      <h3 className="text-xl font-medium">{info.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {info.items.map((item, i) => (
                        <li
                          key={i}
                          className="leading-relaxed flex items-start gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Language Guide */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-black dark:border-white">
              <h2 className="text-2xl font-light text-black dark:text-white">
                Basic Khmer Phrases
              </h2>
            </div>

            <div className="border border-black dark:border-white  overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-white dark:bg-black p-4 font-medium text-black dark:text-white">
                <div>Khmer</div>
                <div>Pronunciation</div>
                <div>English</div>
              </div>

              {/* Table Rows */}
              {languagePhrases.map((phrase) => (
                <div
                  key={phrase.english}
                  className="grid grid-cols-3 p-4 border-t border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                >
                  <div className="text-lg font-medium">{phrase.khmer}</div>
                  <div className="italic">{phrase.phonetic}</div>
                  <div>{phrase.english}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-black dark:border-white">
              <AlertCircle className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              <h2 className="text-2xl font-light">Safety Tips</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyTips.map((item) => (
                <div
                  key={item.title}
                  className="border border-black dark:border-white  p-6 bg-gray-50 dark:bg-black"
                >
                  <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
