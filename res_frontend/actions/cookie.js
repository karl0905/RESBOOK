import { createCookie } from "@remix-run/node";

const tokensCookie = createCookie("tokens", {
  maxAge: 60 * 24 * 60 * 60, // 60 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Set to false for local development
  path: "/",
});

export async function get_cookie(request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = await tokensCookie.parse(cookieHeader);
  return cookies;
}

export async function set_cookie(tokens) {
  return tokensCookie.serialize(tokens);
}
