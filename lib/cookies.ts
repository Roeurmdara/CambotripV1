import { cookies } from "next/headers";

const TOKEN_KEY = "supabase_token";
const REFRESH_TOKEN_KEY = "supabase_refresh_token";

export async function setAuthCookies(
  accessToken: string,
  refreshToken?: string
) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  if (refreshToken) {
    cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  return { accessToken, refreshToken };
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
