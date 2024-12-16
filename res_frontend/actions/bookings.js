import { get_cookie } from "./cookie.js"

const customUserAgent = "MinUserAgent/1.0"

export async function fetchBookings(request) {

  const tokens = await get_cookie(request);

  try {
    const response = await fetch(
      `${process.env.REMIX_PUBLIC_API_URL}/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-agent": customUserAgent,
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Fetch failed:", {
        url: `${process.env.REMIX_PUBLIC_API_URL}/bookings`,
        status: response.status,
        statusText: response.statusText,
        body: errorDetails,
      });

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
  const tokens = await get_cookie(request)
  const formData = await request.formData()
  const bookingId = formData.get("bookingId")
  try {
    const response = await fetch(
      process.env.REMIX_PUBLIC_API_URL + "/bookings",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-agent": customUserAgent,
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({ booking_id: bookingId }),
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("There was a problem with the delete operation:", error)
    throw error
  }
}

export async function updateBooking(request, bookingData) {
  const tokens = await get_cookie(request)
  console.log("Booking data:", JSON.stringify(bookingData))
  try {
    const response = await fetch(
      `${process.env.REMIX_PUBLIC_API_URL}/bookings/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-agent": customUserAgent,
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify(bookingData),
      }
    )
    if (!response.ok) {
      console.log(await response.json())
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
    throw error
  }
}
