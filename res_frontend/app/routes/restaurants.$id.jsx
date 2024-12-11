import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurants.js"
import Logo from "../../features/dashboard/Logo"
import Darkbackground from "../../features/dashboard/Darkbackground"

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

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <Logo />
      <Darkbackground>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
      </Darkbackground>
    </div>
  )
}
