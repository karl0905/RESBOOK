import { redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react"
import { LoginForm } from "../../global/components/loginForm"
import { login } from "../../actions/user"
import { set_cookie } from "../../actions/cookie"
import { Logo } from "../../features/dashboard/Logo"

export const loader = async () => {
  console.log("Loader function called")
  return null
}

export const action = async ({ request }) => {
  console.log("Action function called")
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  console.log("Received email:", email) //
  console.log("Received password:", password)

  try {
    const result = await login(email, password)
    if (result.error) {
      console.error("Login error:", result.error) // Log login error
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
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

export default function LoginPage() {
  console.log("LoginPage component loaded")
  return (
    <>
      <Logo />
      <div className="flex flex-col justify-center items-center  ">
        <h2
          className="text-xl font-semibold text-center  mt-10 mb-5"
          variant="primary"
        >
          Welcome back
        </h2>
        <LoginForm />
      </div>
    </>
  )
}
