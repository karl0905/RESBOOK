"use server"

import { NextResponse } from "next/server"
import { get_cookie, set_cookie } from "@/actions/cookie"
import { decrypt, encrypt } from "@/actions/encryption"

export async function middleware(req) {
  const url = req.nextUrl.clone()

  let tokens
  try {
    tokens = await get_cookie()
  } catch (error) {
    console.error("Error fetching tokens:", error.message)
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Decrypt the tokens
  const decrypted_tokens = await decrypt(tokens)
  if (decrypted_tokens === "Invalid JWT") {
    console.error("Invalid JWT")
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } =
    decrypted_tokens

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

          // Save the access token as a cookie
          await set_cookie(await encrypt(newTokens))

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signup|login).*)"],
}
