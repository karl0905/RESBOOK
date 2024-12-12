"use client"

import { useState } from "react"
import BookingCard from "@/features/bookings/components/BookingCard"
import BookingFilter from "@/features/bookings/components/BookingFilter"
import Link from "next/link"

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
        {filteredBookings.length === 0 && filter === "1" ? (
          <p className="text-center">
            Ingen kommende bookinger. Udforsk restauranter{" "}
            <Link href="/userDashboard" className="underline">
              her
            </Link>
            .
          </p>
        ) : (
          filteredBookings.map((booking) => {
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
          })
        )}
      </article>
    </>
  )
}
