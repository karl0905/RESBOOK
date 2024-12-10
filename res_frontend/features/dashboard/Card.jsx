export default function Card({ name, address, onClick }) {
  return (
    <div
      style={{
        fontFamily: "'Monda', sans-serif",
      }}
      className="bg-card-gray w-full h-[300px] rounded-xl cursor-pointer relative" // Add margin to the card
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 text-sm text-white">{address}</div>
      <div className="flex flex-col items-center justify-center h-full">
        <h2
          style={{
            fontFamily: "montserrat",
            WebkitTextStroke: "0.01em white",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            fontSize: "2rem",
          }}
          className="font-bold text-center uppercase"
        >
          {name}
        </h2>
      </div>
    </div>
  )
}
