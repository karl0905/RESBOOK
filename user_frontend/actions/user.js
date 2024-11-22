// file to contain all the actions related to user

// function to log in the user
export async function login(email, password) {
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await fetch(
      proces.env.NEXT_PUBLIC_API_URL + "/user/login",
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
      return { data };
    }
  } catch (error) {
    return { error: "Failed to log in" };
  }
}
