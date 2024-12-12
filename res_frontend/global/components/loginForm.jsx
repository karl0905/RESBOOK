import { Form, useActionData, useNavigation } from "@remix-run/react"

export function LoginForm() {
  const actionData = useActionData()
  const navigation = useNavigation()

  return (
    <div className="max-w-xs px-4 py-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <Form method="post" className="space-y-4 text-xs">
        <div>
          <label htmlFor="email" className="block  font-medium text-gray-700">
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
        {actionData?.error && (
          <div className="mt-4 text-red-500">{actionData.error}</div>
        )}
      </Form>
    </div>
  )
}
