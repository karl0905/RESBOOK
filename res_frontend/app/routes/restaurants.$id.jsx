import { json } from "@remix-run/node"
import { useLoaderData, useActionData } from "@remix-run/react"
import { fetchRestaurant, updateRestaurant } from "../../actions/restaurants.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
import tonniImage from "../../global/assets/tonni.jpg" // Import the image
import React, { useState } from "react"
import { Form } from "@remix-run/react"

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

export async function action({ request }) {
  const formData = await request.formData()
  const method = request.method

  if (method === "PUT") {
    const restaurantData = {
      id: formData.get("id"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      address: formData.get("address"),
      rating: parseFloat(formData.get("rating")),
      capacity: parseInt(formData.get("capacity")),
      description: formData.get("description"),
      booking_duration: parseInt(formData.get("booking_duration")),
    }

    try {
      const update = await updateRestaurant(restaurantData)
      return { update }
    } catch (error) {
      return json({ error: "Failed to update restaurant details" })
    }
  }

  return json({ error: "Invalid method" }, { status: 405 })
}

export default function RestaurantDetails() {
  const { restaurant, error } = useLoaderData()
  const actionData = useActionData()
  const [name, setName] = useState(restaurant.name)
  const [phone, setPhone] = useState(restaurant.phone)
  const [email, setEmail] = useState(restaurant.email)
  const [address, setAddress] = useState(restaurant.address)
  const [rating, setRating] = useState(restaurant.rating)
  const [capacity, setCapacity] = useState(restaurant.capacity)
  const [description, setDescription] = useState(restaurant.description)
  const [bookingDuration, setBookingDuration] = useState(
    restaurant.booking_duration
  )

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Logo />
      <Darkbackground>
        <div className="flex items-center justify-center py-10">
          <Form
            method="PUT"
            className="text-black bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <input type="hidden" name="id" value={restaurant.id} />
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Restaurant Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-gray-700 font-bold mb-2"
              >
                Rating
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="capacity"
                className="block text-gray-700 font-bold mb-2"
              >
                Capacity
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="booking_duration"
                className="block text-gray-700 font-bold mb-2"
              >
                Booking Duration
              </label>
              <input
                id="booking_duration"
                name="booking_duration"
                type="number"
                value={bookingDuration}
                onChange={(e) => setBookingDuration(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </Form>
        </div>
      </Darkbackground>
    </div>
  )
}
