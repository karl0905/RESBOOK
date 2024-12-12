import { json } from "@remix-run/node"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useLoaderData } from "@remix-run/react"
import { fetchRestaurant } from "../../actions/restaurants.js"
import Darkbackground from "../../features/dashboard/Darkbackground"
import Logo from "../../features/dashboard/Logo"
import Card from "../../features/dashboard/Card"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "../global.css" // Import custom CSS

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
            {restaurants.map((restaurant, index) => (
              <SwiperSlide key={index}>
                <Card
                  onClick={handleClick}
                  name={restaurant.name}
                  address={restaurant.address}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination mt-4"></div>{" "}
          {/* Custom pagination element */}
        </div>
      </Darkbackground>
    </div>
  )
}
