"use client";

import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { fetchRestaurant } from "@/actions/";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function BigCard() {
    const [restaurants, setRestaurants] = useState([]);
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
        <article className="pb-20 px-4">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={800}
                className="custom-swiper"
            >
                {restaurants.map((restaurant, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full h-40 md:h-[50vh] bg-card-gray text-white py-4 px-4 rounded-lg shadow-md cursor-pointer relative flex flex-col justify-between">
                            <div className="absolute top-4 left-4 text-xs md:text-sm">
                                Capacity: <strong className="text-xs md:text-base">{restaurant.capacity || "Unknown"}</strong>
                            </div>
                            <div className="absolute top-3 right-3">
                                <button
                                    aria-label="Like"
                                    onClick={() => console.log(`Liked: ${restaurant.name}`)}
                                >
                                    <AiFillHeart className="text-lg md:text-2xl text-white" />
                                </button>
                            </div>

                            <div className="font-montserrat flex flex-col items-center justify-center h-full pt-2 md:pt-12">
                                <h2 className="text-sm md:text-2xl font-bold pb-1 uppercase text-center">{restaurant.name}</h2>
                                <p className="text-[0.5rem] md:text-sm truncate text-center">{restaurant.description || "No description available."}</p>
                            </div>

                            <div className="flex mt-1 md:mt-4 justify-center">
                                {[...Array(restaurant.stars || 0)].map((_, starIndex) => (
                                    <AiFillStar
                                        key={starIndex}
                                        className="text-sm md:text-lg text-white"
                                    />
                                ))}
                            </div>

                            {/* Rating Display */}
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