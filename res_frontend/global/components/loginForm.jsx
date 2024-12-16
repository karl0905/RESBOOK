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
        className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          {navigation.state === "submitting" ? "Logging in..." : "Login"}
        </button>
      </Form>
      <ToastContainer />
    </div>
  )
}

export default LoginForm
