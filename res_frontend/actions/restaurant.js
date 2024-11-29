import { get_cookie } from "/actions/cookie"

export async function fetchRestaurant() {
  const tokens = await get_cookie("tokens")
  console.log("tokens", tokens)

  try {
    const response = await fetch(
      process.env.REMIX_PUBLIC_API_URL + "/restaurants/read",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  }
}
