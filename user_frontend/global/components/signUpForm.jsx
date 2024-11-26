"use client"
import React, { useState } from "react"
import { Input, Button } from "@/global/components"
import { sign_up } from "@/actions/user"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await sign_up(
      email,
      password,
      confirm_password,
      first_name,
      last_name,
      phone
    )

    if (result.error) {
      console.error("Error:", result.error)
    } else {
      console.log("Success:", result.data)
    }
  }

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
            autoComplete="new-password"
            value={confirm_password}
            onChange={(value) => setConfirmPassword(value)}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
