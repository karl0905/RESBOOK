"use client"

import { Heading } from "@/features/dashboard"

export default function BookingCard({ booking }) {
  const formatDate = (datetime) => {
    const [date, time] = datetime.split(" ")
    const [year, month, day] = date.split("-")
    const [hours, minutes] = time.split(":")
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  return (
    <div
      key={booking?.ID}
      className="bg-card-gray text-white py-4 px-4 sm:py-10 sm:px-5 rounded-lg shadow-md relative flex flex-col justify-between min-h-44"
    >
      <div>{booking?.guest_count} personer</div>
      <div>
        <div className="flex flex-col gap-2">
          <Heading title={booking?.name} className="text-lg px-0 pb-0" />
          <div className="flex justify-between">
            <span>{formatDate(booking?.datetime)}</span>
            <span className="underline italic cursor-pointer">Rediger</span>
          </div>
        </div>
      </div>
    </div>
  )
}
