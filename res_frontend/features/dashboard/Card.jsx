"use client"

import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import fetchRestaurant from '@/actions/restaurant';


const Card = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const data = await fetchRestaurant();
                setRestaurants(data || []);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                setRestaurants([]);
            }
        };

        getRestaurants();
    }, []);

    if (restaurants.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <article>
            {restaurants.map((restaurant, index) => (
                <div key={index} className="bg-card-gray text-white py-10 px-5 rounded-lg shadow-md w-1/3 mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-md font-normal">{restaurant.rating}</span>
                        <button aria-label="Like" onClick={() => console.log('Liked!')}>
                            <AiFillHeart className="text-2xl" />
                        </button>
                    </div>

                    <div className="font-montserrat">
                        <h2 className="text-lg font-bold">{restaurant.name}</h2>
                        <p className="text-sm">{restaurant.description}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-xs">...</div>
                        <div className="flex">
                            {[...Array(restaurant.stars)].map((_, starIndex) => (
                                <AiFillStar key={starIndex} className="text-lg" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </article>
    );
};

export default Card;

