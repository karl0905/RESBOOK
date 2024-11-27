"use client";

import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { fetchRestaurant } from "@/actions/";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Card() {
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
        <article className="py-20 px-4">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {restaurants.map((restaurant, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-card-gray text-white py-10 px-5 rounded-lg shadow-md">

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm">
                                    Kapacitet: <strong>{restaurant.capacity || "Unknown"}</strong>
                                </span>
                                <button
                                    aria-label="Like"
                                    onClick={() => console.log(`Liked: ${restaurant.name}`)}
                                >
                                    <AiFillHeart className="text-2xl text-white" />
                                </button>
                            </div>

                            <div className="font-montserrat flex justify-between items-center pt-6">
                                <div>
                                    <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                                    <p className="text-sm truncate">{restaurant.description || "No description available."}</p>
                                </div>
                                <span className="text-md font-normal flex items-center">
                                    {restaurant.rating || "N/A"}
                                    <AiFillStar className="text-white inline ml-1" />
                                </span>
                            </div>

                            <div className="flex mt-4">
                                {[...Array(restaurant.stars || 0)].map((_, starIndex) => (
                                    <AiFillStar key={starIndex} className="text-lg text-white" />
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </article>
    );
}