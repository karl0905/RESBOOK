"use client"

import { useState } from "react"
import BookingCard from "@/features/bookings/components/BookingCard"
import BookingFilter from "@/features/bookings/components/BookingFilter"

export default function BookingContent({ bookings }) {
  console.log(bookings)
  const [filter, setFilter] = useState("1")

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.datetime)
    return filter === "1" ? bookingDate >= Date.now() : bookingDate < Date.now()
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
        {filteredBookings.map((booking) => (
          <BookingCard key={booking?.ID} booking={booking} />
        ))}
      </article>
    </>
  )
}
