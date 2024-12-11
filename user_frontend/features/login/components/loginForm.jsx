"use client"
import React, { useState } from "react"
import { Input, Button } from "@/global/components"
import { login } from "@/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const loadingToast = toast.loading("Logging in...")

    try {
      const result = await login(email, password)

      if (result.error) {
        toast.error(`Error: ${result.error}`, { id: loadingToast })
      } else {
        toast.success("Successfully logged in!", {
          id: loadingToast,
          description: result.data,
        })
        router.push("/userDashboard")
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.", {
        id: loadingToast,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xs px-4 py-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block  font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder=""
            required
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder=""
            required
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            variant="tertiary"
            type="submit"
            title="Login"
          />
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Create one
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
