import { get_cookie } from "./cookie.js"

// CUstom useragent to work around simply 555 error 
const customUserAgent = "MinUserAgent/1.0"

export async function fetchRestaurant(request) {
  const tokens = await get_cookie(request)
  console.log("tokens", tokens)

  try {
    const response = await fetch(
      process.env.REMIX_PUBLIC_API_URL + "/restaurants/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-agent": customUserAgent,
          Authorization: `Bearer ${tokens.access}`,
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
    throw error
  }
}

export async function updateRestaurant(request, restaurantData) {
  const tokens = await get_cookie(request)
  try {
    const response = await fetch(
      `${process.env.REMIX_PUBLIC_API_URL}/restaurants/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-agent": customUserAgent,
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify(restaurantData),
      }
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
    throw error
  }
}
