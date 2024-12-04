import { get_cookie } from "./cookie.js";

export async function fetchRestaurant(request) {
  const tokens = await get_cookie(request);
  console.log("tokens", tokens);

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
