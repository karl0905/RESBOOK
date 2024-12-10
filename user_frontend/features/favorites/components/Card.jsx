"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { getUserFavorites, addFavorite, deleteFavorite } from "@/actions/";

export function Card() {
    const [favorites, setFavorites] = useState([]);
    const [likedRestaurants, setLikedRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserFavorites = useCallback(async () => {
        try {
            const userFavorites = await getUserFavorites();
            setFavorites(userFavorites || []);
            setLikedRestaurants(userFavorites.map((fav) => fav.restaurant_id));
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

    const toggleLike = async (restaurantId) => {
        try {
            if (likedRestaurants.includes(restaurantId)) {
                await deleteFavorite(restaurantId);
                setLikedRestaurants((prev) =>
                    prev.filter((id) => id !== restaurantId)
                );
            } else {
                const response = await addFavorite(restaurantId);
                if (response) {
                    setLikedRestaurants((prev) => [...prev, restaurantId]);
                }
            }
            // Refresh favorites after toggling
            await fetchUserFavorites();
        } catch (error) {
            console.error("Error toggling like:", error);
            setError("Failed to update favorite. Please try again.");
        }
    };

    if (loading) {
        return <div className="text-white">Loading favorites...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (favorites.length === 0) {
        return <div className="text-white">No favorites available.</div>;
    }

    return (
        <section className="h-screen p-4 pb-20">
            <h2 className="text-xl font-bold text-white mb-4">Your Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((favorite) => (
                    <div
                        key={favorite.restaurant_id}
                        className="bg-card-gray text-white p-4 sm:py-10 sm:px-5 rounded-lg shadow-md cursor-pointer relative"
                    >
                        <div className="absolute top-3 right-3">
                            <button
                                aria-label={likedRestaurants.includes(favorite.restaurant_id) ? "Unlike" : "Like"}
                                onClick={() => toggleLike(favorite.restaurant_id)}
                            >
                                <AiFillHeart
                                    className={`text-lg md:text-2xl ${likedRestaurants.includes(favorite.restaurant_id)
                                        ? "text-red-500"
                                        : "text-white"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="absolute top-4 left-4 text-xs md:text-sm">
                            Kapacitet:{" "}
                            <strong className="text-xs md:text-base">
                                {favorite.capacity || "Unknown"}
                            </strong>
                        </div>

                        <div className="font-montserrat pt-8 md:pt-12">
                            <h3 className="text-sm md:text-xl font-bold pb-1">
                                {favorite.restaurant_name || "No Title"}
                            </h3>
                            <p className="text-[0.5rem] md:text-sm truncate">
                                {favorite.description || "No description available."}
                            </p>
                        </div>

                        <span className="absolute bottom-2 right-3 text-xs md:text-lg font-normal flex items-center">
                            {favorite.rating !== undefined ? favorite.rating : "N/A"}
                            <AiFillStar className="text-white inline ml-1 text-xs md:text-base" aria-hidden="true" />
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}