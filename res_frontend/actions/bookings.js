import { get_cookie } from "./cookie.js";

export async function fetchBookings(request) {
  const tokens = await get_cookie(request);

  try {
    const response = await fetch(
      `${process.env.REMIX_PUBLIC_API_URL}/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );

    // Check if the response is not OK
    if (!response.ok) {
      const errorDetails = await response.text(); // Try to get additional details from the response body
      console.error("Fetch failed:", {
        url: `${process.env.REMIX_PUBLIC_API_URL}/bookings`,
        status: response.status,
        statusText: response.statusText,
        body: errorDetails,
      });

      // Throw a more descriptive error
      throw new Error(
        `Failed to fetch bookings. Status: ${response.status} - ${response.statusText}. Details: ${errorDetails}`
      );
    }

    // Parse and return the JSON data
    const data = await response.json();
    return data;

  } catch (error) {
    // Log a detailed error message
    console.error("There was a problem with the fetch operation:", {
      message: error.message,
      stack: error.stack,
    });

    // Throw a new, descriptive error to propagate it further
    throw new Error(
      `Error fetching bookings: ${error.message}. Check server logs for more details.`
    );
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


export async function updateBooking(request) {
  const tokens = await get_cookie(request);
  const formData = await request.formData();

  const bookingId = formData.get("bookingId");
  const restaurantId = formData.get("restaurantId");
  const date = formData.get("date");
  const time = formData.get("time");
  const guestCount = formData.get("guestCount");
  const name = formData.get("name");
  const comment = formData.get("comment");

  try {
    const response = await fetch(
      process.env.REMIX_PUBLIC_API_URL + "/bookings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({
          booking_id: bookingId,
          restaurant_id: restaurantId,
          date: date,
          time: time,
          guest_count: guestCount,
          first_name: name,
          comment: comment,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update booking");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem updating the booking:", error);
    throw error;
  }
}
