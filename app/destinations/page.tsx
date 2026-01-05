"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { getPersonalizedDestinations } from "@/lib/recommendations";
import Navigation from "@/components/navigation";
import DotWave from "@/components/DotWave";
import { MapPin, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface DestinationPreview {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating?: number;
  best_time?: string;
  personalScore?: number;
}

interface CategorySection {
  title: string;
  destinations: DestinationPreview[];
}

export default function DestinationsPage() {
  const [categories, setCategories] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        let allDestinations: DestinationPreview[] = [];

        if (user) {
          const personalizedDests = await getPersonalizedDestinations(user.id);
          if (personalizedDests.length > 0) {
            allDestinations = personalizedDests;
            setIsPersonalized(true);
          } else {
            const { data, error } = await supabase
              .from("destinations")
              .select("*");
            if (!error && data) {
              allDestinations = data;
            }
          }
        } else {
          const { data, error } = await supabase
            .from("destinations")
            .select("*");
          if (!error && data) {
            allDestinations = data;
          }
        }

        const categorized = categorizeDestinations(allDestinations, isPersonalized);
        setCategories(categorized);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isPersonalized]);

  const categorizeDestinations = (destinations: DestinationPreview[], personalized: boolean) => {
    const categories: CategorySection[] = [];

    if (personalized) {
      const topPicks = destinations
        .filter(d => d.personalScore && d.personalScore > 50)
        .slice(0, 10);
      
      if (topPicks.length > 0) {
        categories.push({
          title: "Recommended for You",
          destinations: topPicks,
        });
      }
    }

    const temples = destinations.filter(d => 
      d.name.toLowerCase().includes("temple") || 
      d.name.toLowerCase().includes("wat") ||
      d.name.toLowerCase().includes("angkor") ||
      d.description?.toLowerCase().includes("temple")
    );

    const beaches = destinations.filter(d => 
      d.location?.toLowerCase().includes("sihanoukville") ||
      d.location?.toLowerCase().includes("kep") ||
      d.location?.toLowerCase().includes("koh") ||
      d.name.toLowerCase().includes("beach") ||
      d.name.toLowerCase().includes("island") ||
      d.description?.toLowerCase().includes("beach")
    );

    const cities = destinations.filter(d => 
      d.location?.toLowerCase().includes("phnom penh") ||
      d.name.toLowerCase().includes("palace") ||
      d.name.toLowerCase().includes("museum") ||
      d.name.toLowerCase().includes("market")
    );

    const nature = destinations.filter(d => 
      d.name.toLowerCase().includes("park") ||
      d.name.toLowerCase().includes("mountain") ||
      d.name.toLowerCase().includes("waterfall") ||
      d.name.toLowerCase().includes("lake") ||
      d.description?.toLowerCase().includes("nature")
    );

    if (temples.length > 0) {
      categories.push({ title: "Temples & Ancient Sites", destinations: temples });
    }
    
    if (beaches.length > 0) {
      categories.push({ title: "Beaches & Islands", destinations: beaches });
    }
    
    if (cities.length > 0) {
      categories.push({ title: "Cities & Culture", destinations: cities });
    }
    
    if (nature.length > 0) {
      categories.push({ title: "Nature & Adventure", destinations: nature });
    }

    const categorizedIds = new Set([
      ...temples.map(d => d.id),
      ...beaches.map(d => d.id),
      ...cities.map(d => d.id),
      ...nature.map(d => d.id),
    ]);

    const remaining = destinations.filter(d => !categorizedIds.has(d.id));
    if (remaining.length > 0) {
      categories.push({ title: "More Destinations", destinations: remaining });
    }

    return categories;
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            {isPersonalized && (
              <div className="inline-flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full mb-4 border border-border">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-light text-muted-foreground">Personalized for You</span>
              </div>
            )}
            <h1 className="font-light text-5xl md:text-6xl text-primary mb-6 text-balance">
              Discover Cambodia
            </h1>
            <p className="text-xl text-muted-foreground text-pretty font-light">
              Explore breathtaking temples, pristine beaches, and vibrant
              culture across Cambodia's most beautiful destinations
            </p>
          </div>
        </section>

        {/* Categories Sections */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <DotWave />
          </div>
        ) : categories.length === 0 ? (
          <section className="py-12 px-4">
            <p className="text-center text-muted-foreground">
              No destinations available.
            </p>
          </section>
        ) : (
          <div className="space-y-16 pb-20">
            {categories.map((category, idx) => (
              <CategoryRow 
                key={idx} 
                category={category} 
                isPersonalized={isPersonalized && idx === 0}
              />
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        {!isPersonalized && (
          <section className="py-20 px-4 bg-card/50">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-light text-4xl text-primary mb-4">
                Get Personalized Recommendations
              </h2>
              <p className="text-muted-foreground font-light mb-8 text-pretty">
                Sign up to discover destinations perfectly matched to your travel style and interests
              </p>
              <Link href="/auth/signup">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-light">
                  Create Free Account
                </button>
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function CategoryRow({ category, isPersonalized }: { category: CategorySection; isPersonalized: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [category.destinations]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('a')?.clientWidth || 300;
      const scrollAmount = cardWidth + 24; // 24px = gap-6
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-light text-3xl md:text-4xl text-primary mb-6">
          {category.title}
        </h2>

        <div className="relative group/section">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border p-2 rounded-full shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border p-2 rounded-full shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            <div className="grid grid-flow-col auto-cols-[calc(33.333%-16px)] md:auto-cols-[calc(33.333%-16px)] gap-6">
              {category.destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.id}`}
                  className="group/card block"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden mb-4">
                    {isPersonalized && destination.personalScore && destination.personalScore > 50 && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-light z-10 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {Math.round(destination.personalScore)}%
                      </div>
                    )}
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover/card:opacity-90 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {destination.location}
                    </div>

                    <h3 className="font-serif text-xl font-medium group-hover/card:text-muted-foreground transition-colors">
                      {destination.name}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 font-light">
                      {destination.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                      {destination.rating && (
                        <>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{destination.rating}</span>
                          </div>
                          <span>·</span>
                        </>
                      )}
                      {destination.best_time && (
                        <span>Best: {destination.best_time}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}