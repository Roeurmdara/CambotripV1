"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { getPersonalizedDestinations } from "@/lib/recommendations";
import Navigation from "@/components/navigation";
import DotWave from "@/components/DotWave";
import { MapPin, Star, ChevronLeft, ChevronRight, Sparkles, Search, Filter, X } from "lucide-react";

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

interface FilterState {
  search: string;
  category: string;
  minRating: number;
  bestTime: string;
}

export default function DestinationsPage() {
  const [categories, setCategories] = useState<CategorySection[]>([]);
  const [allDestinations, setAllDestinations] = useState<DestinationPreview[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategorySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    minRating: 0,
    bestTime: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        let destinations: DestinationPreview[] = [];

        if (user) {
          const personalizedDests = await getPersonalizedDestinations(user.id);
          if (personalizedDests.length > 0) {
            destinations = personalizedDests;
            setIsPersonalized(true);
          } else {
            const { data, error } = await supabase
              .from("destinations")
              .select("*");
            if (!error && data) {
              destinations = data;
            }
          }
        } else {
          const { data, error } = await supabase
            .from("destinations")
            .select("*");
          if (!error && data) {
            destinations = data;
          }
        }

        setAllDestinations(destinations);
        const categorized = categorizeDestinations(destinations, isPersonalized);
        setCategories(categorized);
        setFilteredCategories(categorized);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isPersonalized]);

  useEffect(() => {
    applyFilters();
  }, [filters, allDestinations]);

  const applyFilters = () => {
    let filtered = [...allDestinations];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchLower) ||
        d.location.toLowerCase().includes(searchLower) ||
        d.description?.toLowerCase().includes(searchLower)
      );
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(d => d.rating && d.rating >= filters.minRating);
    }

    // Best time filter
    if (filters.bestTime !== "all") {
      filtered = filtered.filter(d => 
        d.best_time?.toLowerCase().includes(filters.bestTime.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(d => {
        const cat = filters.category.toLowerCase();
        if (cat === "temples") {
          return d.name.toLowerCase().includes("temple") || 
                 d.name.toLowerCase().includes("wat") ||
                 d.name.toLowerCase().includes("angkor") ||
                 d.description?.toLowerCase().includes("temple");
        } else if (cat === "beaches") {
          return d.location?.toLowerCase().includes("sihanoukville") ||
                 d.location?.toLowerCase().includes("kep") ||
                 d.location?.toLowerCase().includes("koh") ||
                 d.name.toLowerCase().includes("beach") ||
                 d.name.toLowerCase().includes("island") ||
                 d.description?.toLowerCase().includes("beach");
        } else if (cat === "cities") {
          return d.location?.toLowerCase().includes("phnom penh") ||
                 d.name.toLowerCase().includes("palace") ||
                 d.name.toLowerCase().includes("museum") ||
                 d.name.toLowerCase().includes("market");
        } else if (cat === "nature") {
          return d.name.toLowerCase().includes("park") ||
                 d.name.toLowerCase().includes("mountain") ||
                 d.name.toLowerCase().includes("waterfall") ||
                 d.name.toLowerCase().includes("lake") ||
                 d.description?.toLowerCase().includes("nature");
        }
        return true;
      });
    }

    const categorized = categorizeDestinations(filtered, isPersonalized);
    setFilteredCategories(categorized);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      minRating: 0,
      bestTime: "all",
    });
  };

  const hasActiveFilters = () => {
    return filters.search !== "" || 
           filters.category !== "all" || 
           filters.minRating > 0 || 
           filters.bestTime !== "all";
  };

  const categorizeDestinations = (destinations: DestinationPreview[], personalized: boolean) => {
    const categories: CategorySection[] = [];

    // Always show personalized recommendations first if available, regardless of filters
    if (personalized) {
      const topPicks = allDestinations
        .filter(d => d.personalScore && d.personalScore > 50)
        .slice(0, 10);
      
      if (topPicks.length > 0) {
        categories.push({
          title: "Recommended for You",
          destinations: topPicks,
        });
      }
    }

    if (filters.category === "all" || filters.category === "temples") {
      const temples = destinations.filter(d => 
        d.name.toLowerCase().includes("temple") || 
        d.name.toLowerCase().includes("wat") ||
        d.name.toLowerCase().includes("angkor") ||
        d.description?.toLowerCase().includes("temple")
      );
      if (temples.length > 0) {
        categories.push({ title: "Temples & Ancient Sites", destinations: temples });
      }
    }

    if (filters.category === "all" || filters.category === "beaches") {
      const beaches = destinations.filter(d => 
        d.location?.toLowerCase().includes("sihanoukville") ||
        d.location?.toLowerCase().includes("kep") ||
        d.location?.toLowerCase().includes("koh") ||
        d.name.toLowerCase().includes("beach") ||
        d.name.toLowerCase().includes("island") ||
        d.description?.toLowerCase().includes("beach")
      );
      if (beaches.length > 0) {
        categories.push({ title: "Beaches & Islands", destinations: beaches });
      }
    }

    if (filters.category === "all" || filters.category === "cities") {
      const cities = destinations.filter(d => 
        d.location?.toLowerCase().includes("phnom penh") ||
        d.name.toLowerCase().includes("palace") ||
        d.name.toLowerCase().includes("museum") ||
        d.name.toLowerCase().includes("market")
      );
      if (cities.length > 0) {
        categories.push({ title: "Cities & Culture", destinations: cities });
      }
    }

    if (filters.category === "all" || filters.category === "nature") {
      const nature = destinations.filter(d => 
        d.name.toLowerCase().includes("park") ||
        d.name.toLowerCase().includes("mountain") ||
        d.name.toLowerCase().includes("waterfall") ||
        d.name.toLowerCase().includes("lake") ||
        d.description?.toLowerCase().includes("nature")
      );
      if (nature.length > 0) {
        categories.push({ title: "Nature & Adventure", destinations: nature });
      }
    }

    if (filters.category === "all") {
      const categorizedIds = new Set(
        categories.flatMap(cat => cat.destinations.map(d => d.id))
      );
      const remaining = destinations.filter(d => !categorizedIds.has(d.id));
      if (remaining.length > 0) {
        categories.push({ title: "More Destinations", destinations: remaining });
      }
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

        {/* Filter Section */}
        <section className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters() && (
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>

              {/* Reset Filters */}
              {hasActiveFilters() && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-card/50 rounded-lg border border-border">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">All Categories</option>
                    <option value="temples">Temples & Ancient Sites</option>
                    <option value="beaches">Beaches & Islands</option>
                    <option value="cities">Cities & Culture</option>
                    <option value="nature">Nature & Adventure</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>

                {/* Best Time Filter */}
                <div>
                  <label className="block text-sm font-light text-muted-foreground mb-2">
                    Best Time to Visit
                  </label>
                  <select
                    value={filters.bestTime}
                    onChange={(e) => setFilters({ ...filters, bestTime: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Any Time</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="year-round">Year Round</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results Count */}
        {!loading && (
          <section className="py-4 px-4">
            <div className="max-w-7xl mx-auto">
              <p className="text-sm text-muted-foreground">
                {filteredCategories.reduce((acc, cat) => acc + cat.destinations.length, 0)} destinations found
              </p>
            </div>
          </section>
        )}

        {/* Categories Sections */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <DotWave />
          </div>
        ) : filteredCategories.length === 0 ? (
          <section className="py-12 px-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                No destinations match your filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </section>
        ) : (
          <div className="space-y-16 pb-20">
            {filteredCategories.map((category, idx) => (
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
      const scrollAmount = cardWidth + 24;
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
        <h2 className="font-light text-3xl md:text-4xl text-primary mb-6">
          {category.title}
        </h2>

        <div className="relative group/section">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border p-2 rounded-full shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border border-border p-2 rounded-full shadow-lg opacity-0 group-hover/section:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          )}

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