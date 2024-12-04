"use client";

import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { fetchRestaurant, addFavorite, deleteFavorite } from "@/actions/";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function Card() {
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

    const toggleLike = async (restaurantId) => {
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
                        <div className="bg-card-gray text-white py-4 px-4 sm:py-10 sm:px-5 rounded-lg shadow-md cursor-pointer relative">

                            <div className="absolute top-4 left-4 text-xs md:text-sm">
                                Kapacitet: <strong className="text-xs md:text-base">{restaurant.capacity || "Unknown"}</strong>
                            </div>
                            <div className="absolute top-3 right-3">
                                <button
                                    aria-label="Like"
                                    onClick={() => toggleLike(restaurant.id)}
                                >
                                    <AiFillHeart
                                        className={`text-lg md:text-2xl ${likedRestaurants.includes(restaurant.id)
                                            ? "text-red-500"
                                            : "text-white"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="font-montserrat pt-8 md:pt-12">
                                <h2 className="text-sm md:text-xl font-bold pb-1 ">{restaurant.name}</h2>
                                <p className="text-[0.5rem] md:text-sm truncate">{restaurant.description || "No description available."}</p>
                            </div>

                            <div className="flex mt-4 md:mt-4">
                                {[...Array(restaurant.stars || 0)].map((_, starIndex) => (
                                    <AiFillStar
                                        key={starIndex}
                                        className="text-sm md:text-lg text-white"
                                    />
                                ))}
                            </div>

                            <span className="absolute bottom-2 right-3 text-xs md:text-lg font-normal flex items-center">
                                {restaurant.rating || "N/A"}
                                <AiFillStar className="text-white inline ml-1 text-xs md:text-base" />
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </article>
    );
}
