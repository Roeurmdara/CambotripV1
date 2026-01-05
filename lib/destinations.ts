import { supabase } from "./supabase";

export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  hero_image: string;
  description: string;
  best_time: string;
  rating: number;
  coordinates: { lat: number; lng: number };
  highlights: string[];
  tips: string[];
  places_to_visit: Array<{ name: string; description: string; type: string }>;
  accommodations: Array<{ name: string; type: string; price: string }>;
  restaurants: Array<{ name: string; cuisine: string; price: string }>;
  transportation: {
    gettingThere: string;
    gettingAround: string;
    costs: string;
  };
  gallery: string[];
  health_and_safety: string[];
}

export async function getDestination(id: string): Promise<Destination | null> {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching destination:", error);
    return null;
  }

  return data;
}

export async function getAllDestinations() {
  const { data, error } = await supabase
    .from("destinations")
    .select("id, name, location, image, description");

  if (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }

  return data;
}
