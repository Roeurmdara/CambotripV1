"use server";

import { signInWithEmail } from "@/lib/auth";
import { setAuthCookies } from "@/lib/cookies";

export async function loginAction(email: string, password: string) {
  const { data, error } = await signInWithEmail(email, password);

  if (error || !data?.session) {
    return { error: error || "Login failed" };
  }

  // Store tokens in cookies
  await setAuthCookies(data.session.access_token, data.session.refresh_token);

  return { success: true, data };
}
