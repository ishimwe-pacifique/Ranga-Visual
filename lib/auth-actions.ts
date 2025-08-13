"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_EMAIL = "admin@gmail.com"
const ADMIN_PASSWORD = "admin@123"

export async function login(email: string, password: string) {
  // Simulate a small delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Set authentication cookie
    cookies().set("admin-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return { success: true, message: "Login successful" }
  } else {
    return { success: false, message: "Invalid email or password" }
  }
}

export async function logout() {
  cookies().delete("admin-auth")
  redirect("/login")
}

export async function isAuthenticated() {
  const authCookie = cookies().get("admin-auth")
  return authCookie?.value === "authenticated"
}
