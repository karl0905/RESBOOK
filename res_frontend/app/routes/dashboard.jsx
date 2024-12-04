import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurants.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
import Card from "../../features/dashboard/Card"

export async function loader({ request }) {
  try {
    const restaurants = await fetchRestaurant(request)

    return { restaurants }
  } catch (error) {
    return json({ error: "Failed to load restaurants" }, { status: 500 })
  }
}

export default function Dashboard() {
  const { restaurants, error } = useLoaderData()

  if (error) {
    return <div>{error}</div>
  }

  function handleClick() {
    console.log("Clicked")
  }
  return (
    <>
      <Logo />
      <Darkbackground>
        <h2 className="mb-4 text-xl font-bold ">MINE RESTAURANTER</h2>
        <div className="flex flex-wrap gap-20">
          {restaurants.map((restaurant, index) => (
            <Card
              onClick={handleClick}
              key={index}
              name={restaurant.name}
              address={restaurant.address}
            />
          ))}
        </div>
      </Darkbackground>
    </>
  )
}
