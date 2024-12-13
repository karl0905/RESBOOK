import { useNavigate } from "@remix-run/react"

export default function Card({ id, name, address, image, apiUrl }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/restaurants/${id}`)
  }

  return (
    <div
      style={{
        fontFamily: "'Monda', sans-serif",
        backgroundImage: `url(${apiUrl}/${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[300px] rounded-xl cursor-pointer relative"
      onClick={handleCardClick}
    >
      <div className="absolute top-2 right-2 text-sm text-white z-20">
        {address}
      </div>
      <div className="flex flex-col items-center justify-center h-full relative z-20">
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
      <div className="bg-black bg-opacity-50 absolute inset-0 z-10"></div>
    </div>
  )
}
