"use server";

import { signUpWithEmail } from "@/lib/auth";
import { setAuthCookies } from "@/lib/cookies";

export async function signupAction(
  name: string,
  email: string,
  password: string
) {
  const { data, error } = await signUpWithEmail(email, password, name);

  if (error || !data?.user) {
    return { error: error || "Signup failed" };
  }

  // Store tokens in cookies if available (for auto-login)
  if (data.session) {
    await setAuthCookies(data.session.access_token, data.session.refresh_token);
  }

  return {
    success: true,
    data,
    message: "Account created! Check your email to confirm your account.",
  };
}
