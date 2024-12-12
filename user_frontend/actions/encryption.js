"use server"

// import jwt library
import { jwtVerify, SignJWT } from "jose"

const secret_key = new TextEncoder().encode(process.env.SECRET_KEY)

// function to encrypt data
export async function encrypt(data) {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60 days from now")
    .sign(secret_key)
}

// function to decrypt data
export async function decrypt(jwt) {
  const jwtString = String(jwt) // Convert jwt to string

  try {
    const { payload } = await jwtVerify(jwtString, secret_key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("JWT verification failed:", error)
    return "Invalid JWT"
  }
}
