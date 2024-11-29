import React, { useState } from "react"
import { useEffect } from "react"

import login from "../../actions/user"
import get_cookie from "../../actions/cookie"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(email, password)

    if (result.error) {
      console.error("Error:", result.error)
    } else {
      console.log("Success:", result.data)
    }
  }
  useEffect(() => {
    const fetchCookies = async () => {
      const cookies = await get_cookie("tokens")
      if (cookies) {
        console.log("Cookies:", cookies)
      } else {
        console.log("No cookies found")
      }
      return cookies
    }
    fetchCookies()
  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
