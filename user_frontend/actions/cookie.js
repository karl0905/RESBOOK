"use server"

import { cookies } from "next/headers"

// function to get the cookie
export async function get_cookie() {
  const tokens = (await cookies()).get("tokens")
  if (!tokens) {
    throw new Error("No cookie found")
  }
  try {
    return tokens.value
  } catch (error) {
    throw new Error("Failed to parse cookie")
  }
}

// function to set a cookie
export async function set_cookie(tokens) {
  const refreshTokenExpiry = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
  ;(await cookies()).set("tokens", tokens, {
    expires: refreshTokenExpiry,
    httpOnly: true,
  })
}

export async function remove_cookie() {
  ;(await cookies()).set("tokens", "", {
    expires: new Date(0),
    httpOnly: true,
  })
}
