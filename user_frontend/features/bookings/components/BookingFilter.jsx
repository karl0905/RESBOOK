"use client"

import { useState, useRef, useEffect } from "react"

export default function BookingFilter({ title_1, title_2, filter, setFilter }) {
  const [underlineWidth, setUnderlineWidth] = useState("0px")
  const [underlineLeft, setUnderlineLeft] = useState("0px")
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)

  useEffect(() => {
    if (filter === "1" && title1Ref.current) {
      setUnderlineWidth(`${title1Ref.current.offsetWidth * 1.1}px`)
      setUnderlineLeft(
        `${
          title1Ref.current.offsetLeft - title1Ref.current.offsetWidth * 0.05
        }px`
      )
    } else if (filter === "2" && title2Ref.current) {
      setUnderlineWidth(`${title2Ref.current.offsetWidth * 1.1}px`)
      setUnderlineLeft(
        `${
          title2Ref.current.offsetLeft - title2Ref.current.offsetWidth * 0.05
        }px`
      )
    }
  }, [filter])

  const handleChange = (value) => {
    console.log(`Changing filter to: ${value}`)
    setFilter(value)
  }

  return (
    <>
      <div className="flex gap-12 mx-auto relative">
        <h3
          ref={title1Ref}
          className={`text-md font-bold px-0 pb-0 cursor-pointer ${
            filter === "1" ? "active" : ""
          }`}
          onClick={() => handleChange("1")}
        >
          {title_1}
        </h3>
        <h3
          ref={title2Ref}
          className={`text-md font-bold px-0 pb-0 cursor-pointer ${
            filter === "2" ? "active" : ""
          }`}
          onClick={() => handleChange("2")}
        >
          {title_2}
        </h3>
        <div
          className="absolute bottom-0 h-0.5 bg-white transition-all duration-300"
          style={{ width: underlineWidth, left: underlineLeft }}
        />
      </div>
    </>
  )
}
