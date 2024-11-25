"use client"

import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { fetchRestaurant } from '@/actions/restaurant';

const Card = () => {
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const getRestaurant = async () => {
            const data = await fetchRestaurant();
            setRestaurant(data);
        };

        getRestaurant();
    }, []);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-card-gray text-white py-10 px-5 rounded-lg shadow-md w-1/3">
            <div className="flex justify-between items-center mb-4">
                <span className="text-md font-normal">{restaurant.score}</span>
                <button aria-label="Like" onClick={() => console.log('Liked!')}>
                    <AiFillHeart className="text-2xl" />
                </button>
            </div>

            <div className="font-montserrat">
                <h2 className="text-lg font-bold">{restaurant.title}</h2>
                <p className="text-sm">{restaurant.text}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="text-xs">...</div>
                <div className="flex">
                    {[...Array(restaurant.stars)].map((_, index) => (
                        <AiFillStar key={index} className="text-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
