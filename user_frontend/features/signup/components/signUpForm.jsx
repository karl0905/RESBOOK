"use client"
import React, { useState } from "react"
import { Input, Button } from "@/global/components"
import { sign_up } from "@/actions/user"
import toast from "react-hot-toast"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Creating your account...");

    try {
      const result = await sign_up(
        email,
        password,
        confirm_password,
        first_name,
        last_name,
        phone
      );

      if (result.error) {
        toast.error(result.error, { id: loadingToast });
      } else {
        toast.success("Account created successfully!", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        id: loadingToast,
      });
    }
  };


  return (
    <div className="max-w-xs px-4 py-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="first_name"
            className="block font-medium text-gray-700"
          >
            First Name
          </label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder=""
            autoComplete="given-name"
            value={first_name}
            onChange={(value) => setFirstName(value)}
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block font-medium text-gray-700"
          >
            Last Name
          </label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder=""
            autoComplete="family-name"
            value={last_name}
            onChange={(value) => setLastName(value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder=""
            autoComplete="tel"
            value={phone}
            onChange={(value) => setPhone(value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder=""
            autoComplete="email"
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
            placeholder=""
            autoComplete="new-password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <div>
          <label
            htmlFor="confirm_password"
            className="block font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder=""
            autoComplete="new-password"
            value={confirm_password}
            onChange={(value) => setConfirmPassword(value)}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" title="Create an acount" />
        </div>
      </form>
      <p className="text-xs my-2 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  )
}
