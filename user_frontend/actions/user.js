"use server"

// imports
import { set_cookie } from "@/actions/cookie"
import { encrypt } from "@/actions/encryption"

// function to log in the user
export async function login(email, password) {
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      // Save the session in a cookie
      await set_cookie(await encrypt(data))
      return { data }
    } else {
      return { error: data.message || "Failed to log in" }
    }
  } catch (error) {
    console.error("Error setting cookie:", error)
    return { error: "try block failed" }
  }
}

// Function to register a new user
export async function sign_up(
  email,
  password,
  phone,
  first_name,
  last_name,
  confirm_password
) {
  if (
    !email ||
    !password ||
    !phone ||
    !first_name ||
    !last_name ||
    !confirm_password
  ) {
    return { error: "All fields are required" }
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phone,
          first_name,
          last_name,
          confirm_password,
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      return { data }
    } else {
      return { error: data.message || "Failed to register" }
    }
  } catch (error) {
    return { error: "Failed to register" }
  }
}
