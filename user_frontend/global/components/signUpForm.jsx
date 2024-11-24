"use client"
import React, { useState } from "react"
import { Input, Button } from "@/global/components"
import { sign_up } from "@/actions/user"

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await sign_up(
      email,
      password,
      phone,
      firstName,
      lastName,
      confirmPassword
    )

    if (result.error) {
      console.error("Error:", result.error)
    } else {
      console.log("Success:", result.data)
    }

    console.log("First Name:", firstName)
    console.log("Last Name:", lastName)
    console.log("Phone:", phone)
    console.log("Email:", email)
    console.log("Password:", password)
    console.log("Confirm Password:", confirmPassword)
  }

  return (
    <div className="max-w-xs px-4 py-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="firstName"
            className="block font-medium text-gray-700"
          >
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(value) => setFirstName(value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium text-gray-700">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={lastName}
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
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(value) => setConfirmPassword(value)}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
