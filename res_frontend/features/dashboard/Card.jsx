"use client"
import React, { useEffect, useState } from "react"
import fetchRestaurant from "../../actions/restaurant.js"

const Card = () => {
  console.log("Card component loaded")

  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("useEffect called")

    const getRestaurants = async () => {
      try {
        console.log("Fetching restaurants...")
        const data = await fetchRestaurant()
        console.log("Fetched data:", data)
        setRestaurants(data || [])
      } catch (err) {
        console.error("Error fetching restaurants:", err)
        setError("Failed to load restaurants.")
      } finally {
        setLoading(false)
        console.log("Loading state set to false")
      }
    }

    getRestaurants()
  }, [])

  console.log("Card component rendered")

  if (loading) {
    console.log("Loading state is true")
    return <div>Loading...</div>
  }
  if (error) {
    console.log("Error state is true")
    return <div>{error}</div>
  }

  console.log("Rendering restaurants")

  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <div key={index}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Card
