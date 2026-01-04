import { getAuthCookies } from "./cookies";

export async function apiPOST(url: string, body: Record<string, unknown>) {
  const { accessToken } = await getAuthCookies();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

export async function apiGET(url: string) {
  const { accessToken } = await getAuthCookies();

  const headers: Record<string, string> = {};

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`, {
    method: "GET",
    headers,
  });
}
