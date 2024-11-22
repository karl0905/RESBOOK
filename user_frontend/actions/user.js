// file to contain all the actions related to user

// function to log in the user
export async function login(email, password) {
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Save the session in a cookie
      (await cookies()).set("tokens", data, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      return { data };
    } else {
      return { error: data.message || "Failed to log in" };
    }
  } catch (error) {
    return { error: "Failed to log in" };
  }
}
