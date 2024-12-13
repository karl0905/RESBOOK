import { useNavigate } from "@remix-run/react"

export default function Card({ id, name, address }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/restaurants/${id}`)
  }

  return (
    <div
      style={{
        fontFamily: "'Monda', sans-serif",
      }}
      className="bg-card-gray w-full h-[300px] rounded-xl cursor-pointer relative"
      onClick={handleCardClick}
    >
      <div className="absolute top-2 right-2 text-sm text-white">{address}</div>
      <div className="flex flex-col items-center justify-center ">
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
