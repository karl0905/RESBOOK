"use client"

import { useState } from "react"
import BookingCard from "@/features/bookings/components/BookingCard"
import BookingFilter from "@/features/bookings/components/BookingFilter"

export default function BookingContent({ bookings }) {
  const [filter, setFilter] = useState("1")

  const filteredBookings = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.datetime)
      return filter === "1"
        ? bookingDate >= Date.now()
        : bookingDate < Date.now()
    })
    .sort((a, b) => {
      const dateA = new Date(a.datetime)
      const dateB = new Date(b.datetime)
      return filter === "1" ? dateA - dateB : dateB - dateA
    })

  return (
    <>
      <BookingFilter
        title_1={"Kommende"}
        title_2={"Historik"}
        filter={filter}
        setFilter={setFilter}
      />
      <article className="pt-4 px-4 flex flex-col gap-3">
        {filteredBookings.map((booking) => {
          const bookingDate = new Date(booking.datetime)
          const isPast = bookingDate < Date.now()
          return (
            <BookingCard
              key={booking?.ID}
              booking={booking}
              greyedOut={isPast ? "opacity-75" : ""}
              isPast={isPast}
            />
          )
        })}
      </article>
    </>
  )
}
