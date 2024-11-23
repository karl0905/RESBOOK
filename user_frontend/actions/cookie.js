"use server"

import { cookies } from "next/headers"

// function to get the cookie
export async function get_cookie() {
  const tokens = (await cookies()).get("tokens")
  if (!tokens) {
    return { error: "No cookie found" }
  }
  try {
    const parsedTokens = JSON.parse(tokens.value)
    return { tokens: parsedTokens }
  } catch (error) {
    return { error: "Failed to parse cookie" }
  }
}

// function to set a cookie
export async function set_cookie(tokens) {
  const refreshTokenExpiry = new Date(tokens.expires_in.refresh * 1000)
  ;(await cookies()).set("tokens", JSON.stringify(tokens), {
    expires: refreshTokenExpiry,
    httpOnly: true,
  })
}
