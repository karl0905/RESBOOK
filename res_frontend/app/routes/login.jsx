import { redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { LoginForm } from "../../global/components/loginForm"
import { login } from "../../actions/user"
import { set_cookie } from "../../actions/cookie"

// Loader function to handle GET requests
export const loader = async () => {
  console.log("Loader function called") // Log when loader is triggered
  return null // You can return any initial data if needed
}

// Action function to handle form submissions
export const action = async ({ request }) => {
  console.log("Action function called") // Log when action is triggered
  console.log("Request method:", request.method) // Log request method
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  console.log("Received email:", email) // Log received email
  console.log("Received password:", password) // Log received password

  try {
    const result = await login(email, password)
    if (result.error) {
      console.error("Login error:", result.error) // Log login error
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 
          "Content-Type": "application/json",
        },
      })
    }

    const cookieValue = await set_cookie(result.data.tokens)
    console.log("Cookie value set:", cookieValue) // Log cookie value

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": cookieValue,
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error) // Log unexpected errors
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

// Default export for the login page
export default function LoginPage() {
  console.log("LoginPage component loaded") // Log when component is loaded
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  )
}
