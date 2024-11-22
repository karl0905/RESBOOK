"use client"
import React, { useState } from "react"
import { Input, Button } from "@/global/components"

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, phone, email, password }),
    })

    console.log("First Name:", firstName)
    console.log("Last Name:", lastName)
    console.log("Phone:", phone)
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    <div className="max-w-xs px-4 py-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="firstName"
            className="block font-medium text-gray-700"
          >
            First name
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder=""
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium text-gray-700">
            Last name
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder=""
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder=""
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" title="Create user"></Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
