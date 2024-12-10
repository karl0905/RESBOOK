"use server"

import { get_cookie } from "@/actions/cookie"
import { decrypt } from "@/actions/encryption"

export async function create_booking(body, restaurantId, userId) {
  const encrypted_tokens = await get_cookie("tokens")
  const decrypted_tokens = await decrypt(encrypted_tokens)

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/bookings/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decrypted_tokens.tokens.access}`,
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          date: body.date,
          time: body.time,
          guest_count: body.guestCount,
          comment: body.comment
        }),
      }
    )
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response:', response.status, errorBody);
      throw new Error(`Network response was not ok: ${response.status} ${errorBody}`);
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}
