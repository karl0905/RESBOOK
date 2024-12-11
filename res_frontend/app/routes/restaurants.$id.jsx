import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurants.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
import tonniImage from "../../global/assets/tonni.jpg" // Import the image
import React, { useState } from "react"

export async function loader({ params, request }) {
  try {
    const restaurants = await fetchRestaurant(request)
    const restaurant = restaurants.find((r) => r.id === parseInt(params.id))

    if (!restaurant) {
      throw new Error("Restaurant not found")
    }

    return { restaurant }
  } catch (error) {
    return json({ error: "Failed to load restaurant details" }, { status: 500 })
  }
}

export default function RestaurantDetails() {
  const { restaurant, error } = useLoaderData()
  const [name, setName] = useState(restaurant.name || "Placeholder name")
  const [address, setAddress] = useState(
    restaurant.address || "Placeholder Address"
  )
  const [description, setDescription] = useState(
    restaurant.description || "Placeholder Beskrivelse"
  )
  const [email, setEmail] = useState(restaurant.email || "Placeholder@Email.dk")
  const [capacity, setCapacity] = useState(
    restaurant.capacity || "Placeholder Kapacitet"
  )
  const [phone, setPhone] = useState(restaurant.phone || "Placeholder Telefon")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add your update logic here, e.g., make an API call to update the restaurant data
    try {
      const response = await fetch(`/restaurants/${restaurant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          description,
          email,
          capacity,
          phone,
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to update restaurant")
      }
      alert("Restaurant updated successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to update restaurant")
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Logo />
      <Darkbackground>
        <div className="absolute top-[120px] left-1/3">
          <img
            src={tonniImage} // Use the imported image
            alt={`${restaurant.name} profile`}
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex p-8 mt-32 ml-20">
          <div className="w-full p-4">
            <div className="h-[100px]">
              <label className="text-lg font-semibold mb-2">
                <strong>TITEL</strong>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-base border w-full bg-transparent border-transparent focus:border-blue-500 focus:ring-0"
              />
            </div>
            <div className="h-[100px]">
              <label className="text-lg font-semibold mb-2">
                <strong>ADDRESSE</strong>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-base border w-full bg-transparent border-transparent focus:border-blue-500 focus:ring-0"
              />
            </div>
            <div className="h-[100px]">
              <label className="text-lg font-semibold mb-2">
                <strong>BESKRIVELSE</strong>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-base border w-full bg-transparent border-transparent focus:border-blue-500 focus:ring-0"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="h-[100px]">
              <label className="text-lg font-semibold mb-2">
                <strong>EMAIL</strong>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base border w-full bg-transparent border-transparent focus:border-blue-500 focus:ring-0"
              />
            </div>
            <div className="h-[100px]">
              <label className="text-lg font-semibold mb-2">
                <strong>KAPACITET</strong>
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="text-base border  w-full bg-transparent border-transparent focus:border-blue-500 focus:ring-0"
              />
            </div>
            <div className="h-[100px]">
              <label className="text-lg font-semibold mb-2">
                <strong>Phone</strong>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-base border  w-full bg-transparent border-transparent focus:border-blue-500 focus:ring-0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </form>
      </Darkbackground>
    </div>
  )
}
