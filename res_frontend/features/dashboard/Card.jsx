import React from "react"

export default function Card({ name, address, onClick }) {
  return (
    <div
      style={{
        fontFamily: "'Monda', sans-serif", // Apply Monda font
      }}
      className="bg-card-gray p-4 rounded-xl shadow-md flex-grow relative w-80 h-80 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 text-sm text-white">{address}</div>
      <div className="flex flex-col items-center justify-center h-full">
        <h2
          style={{
            color: "transparent",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "white",
          }}
          className="text-xl font-bold mb-2 text-center"
        >
          {name}
        </h2>
      </div>
    </div>
  )
}
