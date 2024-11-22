"use server"

import { NextResponse } from "next/server"
import { get_cookie } from "@/actions/cookie"
import { cookies } from "next/headers"

export async function middleware(req) {
  const url = req.nextUrl.clone()

  // Get tokens using the `get_cookie` function
  const { tokens, error } = await get_cookie()

  if (error || !tokens) {
    console.error("Error fetching tokens:", error)
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } =
    tokens

  // Check current date
  const currentDate = new Date()

  // Check if the access token is expired
  if (new Date(accessTokenExpiry) <= currentDate) {
    // Access token is expired
    if (new Date(refreshTokenExpiry) > currentDate) {
      // Refresh token is still valid
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/auth/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          }
        )
        if (response.ok) {
          const newTokens = await response.json()
          // Save the new tokens as a cookie
          const refreshTokenExpiry = new Date(
            newTokens.expires_in.refresh * 1000
          )
          ;(await cookies()).set("tokens", JSON.stringify(newTokens), {
            expires: refreshTokenExpiry,
            httpOnly: true,
          })
          return NextResponse.next()
        } else {
          console.error("Failed to refresh tokens:", response.statusText)
          url.pathname = "/login"
          return NextResponse.redirect(url)
        }
      } catch (error) {
        console.error("Error refreshing tokens:", error)
        url.pathname = "/login"
        return NextResponse.redirect(url)
      }
    } else {
      // Refresh token is also expired
      console.error("Both tokens expired.")
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  // If tokens are valid, proceed to the next middleware or page
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!login|signup).*)"], // Exclude login and signup pages
}
