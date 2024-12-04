"use server"

import { get_cookie } from "@/actions/cookie"

import { decrypt } from "@/actions/encryption"

export async function get_bookings() {
  const encrypted_tokens = await get_cookie("tokens")
  const decrypted_tokens = await decrypt(encrypted_tokens)

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/bookings/read",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decrypted_tokens.tokens.access}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}
