import React from "react"

const Card = ({ name, description }) => {
  return (
    <div className="bg-card-gray text-white py-4 px-4 sm:py-10 sm:px-5 rounded-lg shadow-md cursor-pointer relative">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Card
