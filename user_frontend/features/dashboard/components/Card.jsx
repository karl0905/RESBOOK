"use client";

import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { fetchRestaurant } from '@/actions/';


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
        <article className="flex flex-wrap gap-4 justify-start items-start py-20">
            {restaurants.map((restaurant, index) => (
                <div
                    key={index}
                    className="bg-card-gray text-white py-10 px-5 rounded-lg shadow-md w-80 mb-4"
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-md font-normal">
                            {restaurant.rating || "N/A"} ⭐
                        </span>
                        <button
                            aria-label="Like"
                            onClick={() => console.log(`Liked: ${restaurant.name}`)}
                        >
                            <AiFillHeart className="text-2xl text-red-500" />
                        </button>
                    </div>

                    <div className="font-montserrat">
                        <h2 className="text-lg font-bold">{restaurant.name}</h2>
                        <p className="text-sm">{restaurant.description || "No description available."}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-xs">
                            {restaurant.address || "No address provided"}
                        </div>
                        <div className="flex">
                            {[...Array(restaurant.stars || 0)].map((_, starIndex) => (
                                <AiFillStar key={starIndex} className="text-lg text-yellow-500" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </article>
    );
}
