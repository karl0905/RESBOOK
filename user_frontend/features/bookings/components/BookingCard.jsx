"use client"

import { useState } from "react"
import Modal from "@/global/components/Modal"
import { Input } from "@/global/components/Input"
import { Button } from "@/global/components"

export default function BookingCard({ booking, greyedOut }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const formatDate = (datetime) => {
    const [date, time] = datetime.split(" ")
    const [year, month, day] = date.split("-")
    const [hours, minutes] = time.split(":")
    return `${day}-${month}-${year} ${hours}:${minutes}`
  }

  return (
    <div
      key={booking?.ID}
      className={`bg-card-gray text-white py-4 px-4 sm:py-10 sm:px-5 rounded-lg shadow-md relative flex flex-col justify-between min-h-44 ${greyedOut}`}
    >
      <div>{booking?.guest_count} personer</div>
      <div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg text-white italic">{booking?.name}</h3>
          <div className="flex justify-between">
            <span>{formatDate(booking?.datetime)}</span>
            <span
              className="underline italic cursor-pointer"
              onClick={openModal}
            >
              Rediger Booking
            </span>
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
                  />
                  <Input
                    type="time"
                    defaultValue={booking?.datetime.split(" ")[1]}
                    variant="primary"
                    min="12:00"
                    max="23:00"
                  />
                </div>
                <div className="flex justify-between">
                  <Button title="Gem" onClick={closeModal} />
                  <Button
                    variant="destructive"
                    title="Slet booking"
                    onClick={closeModal}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
