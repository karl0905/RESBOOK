import { json } from "@remix-run/node"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurants.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
import Card from "../../features/dashboard/Card"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "../global.css"

export async function loader({ params, request }) {
  try {
    const restaurants = await fetchRestaurant(request)
    const restaurant = restaurants.find((r) => r.id === parseInt(params.id))
    const apiUrl = process.env.REMIX_PUBLIC_API_URL

    return { restaurants, apiUrl }
  } catch (error) {
    return json({ error: "Failed to load restaurants" }, { status: 500 })
  }
}

export default function Dashboard() {
  const { restaurants, error, apiUrl } = useLoaderData()
  const navigate = useNavigate()

  if (error) {
    return <div>{error}</div>
  }

  function handleCardClick(restaurantId) {
    if (restaurantId) {
      navigate(`/restaurants/${restaurantId}`)
    } else {
      console.error("Restaurant ID is undefined")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Logo />
      <Darkbackground>
        <div className="p-6">
          <h2 className="mb-6 text-white text-xl font-bold">
            MINE RESTAURANTER
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            pagination={{
              clickable: true,
              el: ".swiper-pagination", // Custom pagination element
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {restaurants.map((restaurant) => (
              <SwiperSlide key={restaurant.id}>
                <Card
                  onClick={() => handleCardClick(restaurant.id)}
                  id={restaurant.id}
                  name={restaurant.name}
                  address={restaurant.address}
                  image={restaurant.image}
                  apiUrl={apiUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination mt-4"></div>{" "}
        </div>
      </Darkbackground>
    </div>
  )
}
