const customUserAgent = 'MinUserAgent/1.0';

export async function login(email, password) {
  try {
    const response = await fetch(`${process.env.REMIX_PUBLIC_API_URL}/users/login/index.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "user-agent": customUserAgent,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.log(response)
      throw new Error('Login failed');
    }

    const data = await response.json();
    return { data }; // Adjust according to your API response structure
  } catch (error) {
    return { error: error.message };
  }
}
