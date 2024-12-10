"use server"

import { get_cookie } from "@/actions/cookie"
import { decrypt } from "@/actions/encryption"

export async function create_booking(body, restaurantId) {
  const encrypted_tokens = await get_cookie("tokens");
  const decrypted_tokens = await decrypt(encrypted_tokens);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/`,
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
    );

    if (!response.ok) {
      const errorData = await response.json(); 
      return { success: false, error: errorData.error || "An unknown error occurred." };
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return { success: false, error: "An unexpected error occurred while creating the booking." };
  }
}

