"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "km";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    destinations: "Destinations",
    map: "Map",
    culture: "Culture",
    blog: "Blog",
    practical: "Practical Info",
    contact: "Contact",

    // Common
    learnMore: "Learn More",
    viewDetails: "View Details",
    getDirections: "Get Directions",
    readMore: "Read More",

    // Home
    discoverCambodia: "Discover Cambodia",
    homeSubtitle:
      "Explore ancient temples, pristine beaches, and vibrant culture",
    exploreDestinations: "Explore Destinations",

    // Destinations
    topDestinations: "Top Destinations",
    exploreOurTop: "Explore our top destinations in Cambodia",

    // Map
    interactiveMap: "Interactive Map",
    exploreMap: "Explore Cambodia's destinations on our interactive map",

    // Culture
    cambodianCulture: "Cambodian Culture & Traditions",
    discoverRich: "Discover the rich cultural heritage of Cambodia",

    // Practical
    practicalInfo: "Practical Information",
    essentialInfo: "Essential information for your Cambodia trip",
  },
  km: {
    // Navigation
    destinations: "ទិសដៅ",
    map: "ផែនទី",
    culture: "វប្បធម៌",
    blog: "ប្លុក",
    practical: "ព័ត៌មានជាក់ស្តែង",
    contact: "ទំនាក់ទំនង",

    // Common
    learnMore: "ស្វែងយល់បន្ថែម",
    viewDetails: "មើលព័ត៌មានលម្អិត",
    getDirections: "ទទួលបានទិសដៅ",
    readMore: "អានបន្ថែម",

    // Home
    discoverCambodia: "ស្វែងរកកម្ពុជា",
    homeSubtitle: "ស្វែងរកប្រាសាទបុរាណ ឆ្នេរស្អាត និងវប្បធម៌រស់រវើក",
    exploreDestinations: "ស្វែងរកទិសដៅ",

    // Destinations
    topDestinations: "ទិសដៅកំពូល",
    exploreOurTop: "ស្វែងរកទិសដៅកំពូលរបស់យើងនៅកម្ពុជា",

    // Map
    interactiveMap: "ផែនទីអន្តរកម្ម",
    exploreMap: "ស្វែងរកទិសដៅរបស់កម្ពុជានៅលើផែនទីអន្តរកម្មរបស់យើង",

    // Culture
    cambodianCulture: "វប្បធម៌ និងប្រពៃណីកម្ពុជា",
    discoverRich: "ស្វែងរកបេតិកភណ្ឌវប្បធម៌ដ៏សម្បូរបែបរបស់កម្ពុជា",

    // Practical
    practicalInfo: "ព័ត៌មានជាក់ស្តែង",
    essentialInfo: "ព័ត៌មានសំខាន់សម្រាប់ការធ្វើដំណើររបស់អ្នកនៅកម្ពុជា",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    if (!currentTranslations) {
      return key;
    }
    return currentTranslations[key as keyof typeof translations.en] || key;
  };

  // Always provide value, even if not mounted
  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
