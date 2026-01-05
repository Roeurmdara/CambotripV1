"use server";

import { supabase } from "@/lib/supabase";
import { clearAuthCookies } from "@/lib/cookies";
// note: avoid using `redirect()` inside a server action because it throws
// a special redirect exception that may surface to the caller. Return a
// success object instead and let the client perform navigation.

export async function logoutAction() {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();

    // Clear auth cookies
    await clearAuthCookies();

    // Return success and let the client navigate
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to logout" };
  }
}
