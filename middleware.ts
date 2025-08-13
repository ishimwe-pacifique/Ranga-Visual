import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for authentication cookie
    const authCookie = request.cookies.get("admin-auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      // Redirect to login if not authenticated
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Check if authenticated user is trying to access login page
  if (request.nextUrl.pathname === "/login") {
    const authCookie = request.cookies.get("admin-auth")

    if (authCookie && authCookie.value === "authenticated") {
      // Redirect to admin if already authenticated
      const adminUrl = new URL("/admin", request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
