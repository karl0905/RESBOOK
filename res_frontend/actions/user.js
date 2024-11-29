import { json } from "@remix-run/node"
import { set_cookie } from "/actions/cookie"

// function to log in the user
export async function login({ email, password }) {
  const apiUrl = process.env.REMIX_PUBLIC_API_URL
  console.log("API URL:", apiUrl) // Log the API URL first thing

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 })
  }

  try {
    const response = await fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      // Save the session in a cookie
      await set_cookie(await encrypt(data))
      return json({ data })
    } else {
      return json(
        { error: data.message || "Failed to log in" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error setting cookie:", error)
    return json(
      { error: "try block failed", details: error.message },
      { status: 500 }
    )
  }
}
