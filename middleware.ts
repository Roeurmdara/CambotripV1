import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that don't require authentication
const publicRoutes = ["/", "/auth/login", "/auth/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("supabase_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Check if route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // If no token and trying to access protected route, redirect to signup
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signup", req.url));
  }

  // If logged in and trying to access auth pages, redirect to home
  if (token && (pathname === "/auth/login" || pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
