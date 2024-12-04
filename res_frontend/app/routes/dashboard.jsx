import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurant.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
import Card from "../../features/dashboard/Card"

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
    <>
      <Logo />
      <Darkbackground>
        <h2>MINE RESTAURANTER</h2>
        <div className="flex flex-wrap gap-20">
          {restaurants.map((restaurant, index) => (
            <Card
              key={index}
              name={restaurant.name}
              description={restaurant.description}
            />
          ))}
        </div>
      </Darkbackground>
    </>
  )
}
