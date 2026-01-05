import { supabase } from "./supabase";

export interface UserPreferences {
  travel_style: string;
  budget_range: string;
  interests: string[];
}

export async function getUserPreferences(
  userId: string
): Promise<UserPreferences | null> {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    // If RLS prevents reading (or any other error), log details and
    // treat as "no preferences" so the UI can trigger onboarding.
    console.error("Error fetching preferences:", {
      message: (error as any)?.message,
      details: (error as any)?.details,
      hint: (error as any)?.hint,
      userId,
    });
    return null;
  }

  return data;
}

export function scoreDestination(
  destination: any,
  preferences: UserPreferences
): number {
  let score = 0;

  // Score based on travel style (0-30 points)
  if (preferences.travel_style === "adventure" && destination.rating >= 4.5) {
    score += 30;
  } else if (
    preferences.travel_style === "luxury" &&
    destination.rating >= 4.8
  ) {
    score += 30;
  } else if (preferences.travel_style === "cultural") {
    score += 25;
  } else if (preferences.travel_style === "relaxation") {
    score += 20;
  }

  // Score based on budget (0-30 points)
  const hasAccommodations =
    destination.accommodations && destination.accommodations.length > 0;
  if (hasAccommodations) {
    const budgetMatches = destination.accommodations.some((acc: any) => {
      if (preferences.budget_range === "budget") return acc.type === "Budget";
      if (preferences.budget_range === "mid-range")
        return acc.type === "Mid-range";
      if (preferences.budget_range === "luxury") return acc.type === "Luxury";
      return false;
    });
    if (budgetMatches) score += 30;
  }

  // Score based on interests (0-40 points)
  const destinationTags = [
    ...(destination.highlights || []),
    ...(destination.tips || []),
    destination.description || "",
  ]
    .join(" ")
    .toLowerCase();

  preferences.interests.forEach((interest) => {
    if (interest === "temples" && destinationTags.includes("temple"))
      score += 10;
    if (
      interest === "nature" &&
      (destinationTags.includes("nature") || destinationTags.includes("park"))
    )
      score += 10;
    if (interest === "food" && destinationTags.includes("food")) score += 10;
    if (interest === "beaches" && destinationTags.includes("beach"))
      score += 10;
    if (interest === "culture" && destinationTags.includes("culture"))
      score += 10;
  });

  return score;
}

export async function getPersonalizedDestinations(userId: string) {
  const preferences = await getUserPreferences(userId);

  const { data: destinations, error } = await supabase
    .from("destinations")
    .select("*");

  if (error || !destinations) {
    console.error("Error fetching destinations:", error);
    return [];
  }

  if (!preferences) {
    return destinations; // Return all if no preferences
  }

  // Score and sort destinations
  const scoredDestinations = destinations.map((dest) => ({
    ...dest,
    personalScore: scoreDestination(dest, preferences),
  }));

  return scoredDestinations.sort((a, b) => b.personalScore - a.personalScore);
}
