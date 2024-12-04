import React from "react"

export default function Card({ name, address }) {
  return (
    <div className="bg-gray-600 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded-lg shadow-md flex-grow relative min-h-[200px]">
      <div className="absolute top-2 right-2 text-sm text-white">{address}</div>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-2 text-center">{name}</h2>
      </div>
    </div>
  )
}
