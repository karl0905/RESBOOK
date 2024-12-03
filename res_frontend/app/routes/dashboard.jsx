import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchRestaurant } from "../../actions/restaurant.js";

export async function loader({ request }) {
  try {
    const restaurants = await fetchRestaurant(request);
    console.log("restaurants", restaurants);
    return { restaurants };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return json({ error: "Failed to load restaurants" }, { status: 500 });
  }
}

export default function Dashboard() {
  const { restaurants, error } = useLoaderData();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <div key={index}>
          <h2 className="text-black">{restaurant.name}</h2>
          <p className="text-black">{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
}
