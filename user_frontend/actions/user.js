// user_frontend/actions/user.js
export async function login(email, password) {
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
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
      return { data }
    } else {
      return { error: data.message || "Login failed" }
    }
  } catch (error) {
    return { error: error.message }
  }
}
