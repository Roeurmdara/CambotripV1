import { supabase } from "./supabase";
import { UserPreferences } from "@/components/preferences-modal";

export async function saveUserPreferences(preferences: UserPreferences) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Update user metadata with preferences
    const { error } = await supabase.auth.updateUser({
      data: {
        travel_preferences: preferences,
      },
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error saving preferences:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to save preferences",
    };
  }
}

export async function getUserPreferences(): Promise<UserPreferences | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const preferences = user.user_metadata?.travel_preferences as
      | UserPreferences
      | undefined;
    return preferences || null;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return null;
  }
}
