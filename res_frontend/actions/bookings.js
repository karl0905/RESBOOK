import { get_cookie } from "./cookie.js";

export async function fetchBookings(request) {
  const tokens = await get_cookie(request);
  console.log("tokens", tokens);

  try {
    const response = await fetch(
      process.env.REMIX_PUBLIC_API_URL + "/bookings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export async function deleteBooking(request) {
  const tokens = await get_cookie(request);
  const formData = await request.formData();
  const bookingId = formData.get("bookingId");
  try {
    const response = await fetch(
      process.env.REMIX_PUBLIC_API_URL + "/bookings",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({ booking_id: bookingId }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the delete operation:", error);
    throw error;
  }
}