import { json } from "@remix-run/node"
import { useLoaderData, useActionData, Form } from "@remix-run/react"
import { fetchRestaurant, updateRestaurant } from "../../actions/restaurants.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
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
      const update = await updateRestaurant(request, restaurantData)
      return { update }
    } catch (error) {
      return json({ error: "Action failed" }, { status: 500 })
    }
  }

  return json({ error: "Invalid method" }, { status: 405 })
}

export default function RestaurantDetails() {
  const { restaurant, error } = useLoaderData() || {}
  const actionData = useActionData()
  const [name, setName] = useState(restaurant?.name || "")
  const [phone, setPhone] = useState(restaurant?.phone || "")
  const [email, setEmail] = useState(restaurant?.email || "")
  const [address, setAddress] = useState(restaurant?.address || "")
  const [rating, setRating] = useState(restaurant?.rating || 0)
  const [capacity, setCapacity] = useState(restaurant?.capacity || 0)
  const [description, setDescription] = useState(restaurant?.description || "")
  const [bookingDuration, setBookingDuration] = useState(
    restaurant?.booking_duration || 0
  )

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Logo />
      <Darkbackground>
        <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
          <div className="relative  mt-[-100px] ">
            <img
              src="/profilePicture.png"
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-full shadow-md"
            />
          </div>
          <Form
            method="PUT"
            className=" text-white bg-transparent p-4 sm:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-md"
          >
            <input type="hidden" name="id" value={restaurant.id} />
            <input type="hidden" name="rating" value={rating} />
            <input
              type="hidden"
              name="booking_duration"
              value={bookingDuration}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Restaurant Name
                </label>
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-white border-none focus:outline-none focus:border-none"
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
                  autoComplete="off"
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-white border-none focus:outline-none focus:border-none"
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
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white border-none focus:outline-none focus:border-none"
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
                  autoComplete="off"
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-transparent text-white border-none focus:outline-none focus:border-none"
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
                  autoComplete="off"
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value))}
                  className="w-full bg-transparent text-white border-none focus:outline-none focus:border-none no-spinner"
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
                  autoComplete="off"
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-transparent text-white border-none focus:outline-none focus:border-none"
                />
              </div>
            </div>
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Update
              </button>
            </div>
          </Form>
          <div>
            {actionData?.error && (
              <div className="text-red-500 mt-4">{actionData.error}</div>
            )}
            {actionData?.update && (
              <div className="text-green-500 mt-4">
                Restaurant updated successfully!
              </div>
            )}
          </div>
        </div>
      </Darkbackground>
    </div>
  )
}
