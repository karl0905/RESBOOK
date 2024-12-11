
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { fetchRestaurant, addFavorite, deleteFavorite, getUserFavorites } from "@/actions/";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export function Card() {

  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurant();
        setRestaurants(data || []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, []);

  const fetchUserFavorites = useCallback(async () => {
    try {
      const userFavorites = await getUserFavorites();
      setLikedRestaurants(userFavorites.map(fav => fav.restaurant_id) || []);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      setError("Failed to fetch user favorites.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserFavorites();
  }, [fetchUserFavorites]);

  const handleClick = (restaurant_id) => {
    router.push(`/restaurant/${restaurant_id}`);
  };

  const toggleLike = async (restaurantId, e) => {
    e.stopPropagation();
    try {
      if (likedRestaurants.includes(restaurantId)) {
        // Call deleteFavorite if already liked
        console.log("Calling deleteFavorite for restaurant:", restaurantId);
        const response = await deleteFavorite(restaurantId);
        console.log("Delete response:", response);
        setLikedRestaurants((prevLiked) =>
          prevLiked.filter((id) => id !== restaurantId)
        );
      } else {
        // Call addFavorite if not liked
        console.log("Calling addFavorite for restaurant:", restaurantId);
        const response = await addFavorite(restaurantId);
        console.log("Add response:", response);
        setLikedRestaurants((prevLiked) => [...prevLiked, restaurantId]);
      }
    } catch (error) {
      console.error("Error toggling like for the restaurant:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (restaurants.length === 0) {
    return <div className="text-white">No restaurants available.</div>;
  }

  return (
    <article className="pt-4 px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        pagination={{
          clickable: true,
        }}
        className="custom-swiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {restaurants.map((restaurant, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <div
                className="text-white py-4 px-4 sm:py-10 sm:px-5 rounded-lg shadow-md cursor-pointer relative"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${restaurant.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {" "}
                <div className="absolute top-4 left-4 text-xs md:text-sm z-20">
                  Kapacitet:{" "}
                  <strong className="text-xs md:text-base">
                    {restaurant.capacity || "Unknown"}
                  </strong>
                </div>
                <div className="absolute top-3 right-3 z-20">
                  <button
                    aria-label={
                      likedRestaurants.includes(restaurant.id)
                        ? "Unlike"
                        : "Like"
                    }
                    onClick={() => toggleLike(restaurant.id)}
                  >
                    <AiFillHeart
                      className={`text-lg md:text-2xl ${
                        likedRestaurants.includes(restaurant.id)
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>
                <div className="font-montserrat relative pt-8 md:pt-12 z-20">
                  <h2 className="text-sm md:text-xl font-bold pb-1">
                    {restaurant.name}
                  </h2>
                  <p className="text-[0.5rem] md:text-sm truncate">
                    {restaurant.description || "No description available."}
                  </p>
                </div>
                <div className="flex mt-4 z-20 md:mt-4">
                  {[...Array(restaurant.stars || 0)].map((_, starIndex) => (
                    <AiFillStar
                      key={starIndex}
                      className="text-sm md:text-lg text-white"
                    />
                  ))}
                </div>
                <span className="absolute bottom-2 right-3 text-xs md:text-lg font-normal flex items-center z-20">
                  {restaurant.rating || "N/A"}
                  <AiFillStar className="text-white inline ml-1 text-xs md:text-base" />
                </span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  )
}