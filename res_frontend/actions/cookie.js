import { createCookie } from "@remix-run/node"

// Create a cookie instance
const tokensCookie = createCookie("tokens", {
  maxAge: 60 * 24 * 60 * 60, // 60 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
})

// Function to get the cookie
export async function get_cookie(request) {
  const cookieHeader = request.headers.get("Cookie")
  const cookies = await tokensCookie.parse(cookieHeader)
  const tokens = cookies?.tokens

  if (!tokens) {
    throw new Error("No cookie found")
  }

  try {
    return tokens
  } catch (error) {
    throw new Error("Failed to parse cookie")
  }
}

// Function to set a cookie
export async function set_cookie(tokens, response) {
  const cookieHeader = await tokensCookie.serialize(tokens)
  response.headers.append("Set-Cookie", cookieHeader)
}
