import { useLoaderData } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurant.js"
import Logo from "../../features/dashboard/Logo"
import Darkbackground from "../../features/dashboard/Darkbackground.jsx"
import Card from "../../features/dashboard/Card.jsx"

export async function loader({ request }) {
  try {
    const restaurants = await fetchRestaurant(request)
    console.log("restaurants", restaurants)
    return { restaurants }
  } catch (error) {
    console.error("Error fetching restaurants:", error)
    return json({ error: "Failed to load restaurants" }, { status: 500 })
  }
}

export default function Dashboard() {
  const { restaurants, error } = useLoaderData()

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <Logo />
      <Darkbackground>
        {restaurants.map((restaurant, index) => (
          <Card key={index} restaurant={restaurant} />
        ))}
      </Darkbackground>
    </div>
  )
}
