import React from "react"

const Darkbackground = ({ children }) => {
  return (
    <div className="bg-black text-white w-full h-screen p-6 rounded-t-2xl">
      {children}
    </div>
  )
}

export default Darkbackground
