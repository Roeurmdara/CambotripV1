"use server";

import { supabase } from "@/lib/supabase";
import { clearAuthCookies } from "@/lib/cookies";
import { redirect } from "next/navigation";

export async function logoutAction() {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();

    // Clear auth cookies
    await clearAuthCookies();

    // Redirect to home
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to logout" };
  }
}
