// Card.jsx
import React, { useEffect, useState } from "react"

const Card = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await getRestaurants()
        setRestaurants(data || [])
      } catch (err) {
        console.error("Error fetching restaurants:", err)
        setError("Failed to load restaurants.")
      } finally {
        setLoading(false)
      }
    }

    getRestaurants()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return <div>{/* Render restaurants here */}</div>
}

export default Card
