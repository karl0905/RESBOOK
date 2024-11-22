"user server"

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
