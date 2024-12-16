import { Form, useActionData, useNavigation } from "@remix-run/react"
import Logo from "../../features/dashboard/Logo"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"

export function LoginForm() {
  const actionData = useActionData()
  const navigation = useNavigation()

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error)
    }
  }, [actionData])

  return (
    <div>
      <Logo />
      <Form
        method="POST"
        className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Welcome back</h2>
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
          />
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
          />
        </div>
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="w-full px-4 py-2 bg-black text-white border-black border-2 font-semibold rounded-xl hover:bg-white hover:text-black  transition duration-150 ease-in-out"
        >
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </button>
      </Form>
      <ToastContainer />
    </div>
  )
}

export default LoginForm
