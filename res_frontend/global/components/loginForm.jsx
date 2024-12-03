import React, { useState, useEffect } from "react"
import login from "../../actions/user"
import get_cookie from "../../actions/cookie"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    console.log("LoginForm component loaded")

    const fetchCookies = async () => {
      const cookies = await get_cookie("tokens")
      console.log(cookies)
    }
    fetchCookies()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("Form submitted")

    const result = await login(email, password)

    if (result.error) {
      console.error("Error:", result.error)
    } else {
      console.log("Success:", result.data)
    }
  }

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
