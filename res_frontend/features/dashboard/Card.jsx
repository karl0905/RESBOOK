import React from "react"

function Card({ restaurant }) {
  return (
    <div className="text-white w-full h-auto p-6 rounded-t-2xl bg-gray-800 mb-4">
      <h2 className="text-xl font-bold">{restaurant.name}</h2>
      <p>{restaurant.description}</p>
    </div>
  )
}

export default Card
