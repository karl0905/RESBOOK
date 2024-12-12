"use client"

import { useState } from "react"
import Modal from "@/global/components/Modal"
import { Input } from "@/global/components/Input"
import { Button } from "@/global/components"
import { update_booking, delete_booking } from "@/actions/booking"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"

export default function BookingCard({ booking, greyedOut, isPast }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guest_count, setGuestCount] = useState(booking?.guest_count)
  const [date, setDate] = useState(booking?.datetime.split(" ")[0])
  const [time, setTime] = useState(booking?.datetime.split(" ")[1])
  const path = usePathname()

  // console log the time and date
  console.log(date, time)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const formatDate = (datetime) => {
    const [date, time] = datetime.split(" ")
    const [year, month, day] = date.split("-")
    const [hours, minutes] = time.split(":")
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  const formatTime = (datetime) => {
    const time = datetime.split(" ")[1]
    const [hours, minutes] = time.split(":")
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
  }

  // Function to update booking
  const handleUpdateBooking = async () => {
    const updatedBooking = {
      booking_id: booking?.ID,
      guest_count: guest_count,
      time: time,
      date: date,
      restaurant_id: booking?.restaurant_id,
    }
    const data = await update_booking(updatedBooking, path)
    console.log(data)
    if (data.success) {
      closeModal()
      toast.success(data.success)
    } else {
      toast.error(data.error)
    }
  }

  // Function to delete booking
  const handleDeleteBooking = async () => {
    const deletedBooking = {
      booking_id: booking?.ID,
      restaurant_id: booking?.restaurant_id,
    }
    console.log(booking)
    const data = await delete_booking(deletedBooking, path)
    if (data.success) {
      closeModal()
      toast.success(data.success)
    } else {
      toast.error(data.error)
    }
  }

  return (
    <div
      key={booking?.ID}
      className={`bg-card-gray text-white py-4 px-4 my-3 mx-1 sm:py-10 sm:px-5 rounded-lg shadow-md relative flex flex-col justify-between min-h-44 ${greyedOut}`}
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${booking?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-20">{booking?.guest_count} personer</div>
      <div className="relative z-20">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg text-white italic">{booking?.name}</h3>
          <div className="flex justify-between">
            <span>{formatDate(booking?.datetime)}</span>
            <span
              className="underline italic cursor-pointer"
              onClick={!isPast ? openModal : undefined}
            >
              Rediger Booking
            </span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="text-black flex flex-col gap-4">
          <div>
            <span className="font-bold">Antal gæster:</span>
            <Input
              type="number"
              defaultValue={booking?.guest_count}
              variant="primary"
              max="10"
              min="1"
              placeholder="Antal gæster"
              onChange={(e) => setGuestCount(e)}
            />
          </div>
          <div>
            <span className="font-bold">Dato og tid:</span>
            <Input
              type="date"
              defaultValue={booking?.datetime.split(" ")[0]}
              variant="primary"
              className="mb-2"
              min={new Date().toISOString().split("T")[0]} // Set min date to today
              onChange={(e) => setDate(e)}
            />
            <Input
              type="time"
              defaultValue={formatTime(booking?.datetime)}
              variant="primary"
              min="12:00"
              max="23:00"
              onChange={(e) => setTime(e)} // Handle event object
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="tertiary"
              title="Gem"
              onClick={handleUpdateBooking}
            />
            <Button
              variant="destructive"
              title="Slet booking"
              onClick={handleDeleteBooking}
            />
          </div>
        </div>
      </Modal>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
    </div>
  )
}
