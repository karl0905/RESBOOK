import React from "react"

const Card = ({ name, description }) => {
  return (
    <div className="bg-gray-600 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-md flex-grow">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Card
