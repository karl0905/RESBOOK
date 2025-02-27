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
      process.env.NEXT_PUBLIC_API_URL + "/users/login/",
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
      return { error: data.error || "Failed to log in" }
    }
  } catch (error) {
    return { error: data.error || "Failed to log in" }
  }
}

// actions/user.js
// user.js
export async function sign_up(email, password, confirm_password, first_name, last_name, phone) {
  if (!email || !password || !confirm_password || !first_name || !last_name || !phone) {
    return { error: "All fields are required" };
  }

  if (password !== confirm_password) {
    return { error: "Passwords do not match" };
  }

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirm_password,
        first_name,
        last_name,
        phone,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { data };
    } else {
      return { error: data.error || "Failed to register" };
    }
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
