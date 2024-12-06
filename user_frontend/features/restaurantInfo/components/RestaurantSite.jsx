"use client"
import {
  Darkbackground,
  Logo,
} from "@/features/dashboard";
import {
  Button
} from "@/global/components";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineStar
} from "react-icons/ai";
import {
  BookingView,
  BookingStep,
  ButtonSelect,
  MyDatePicker
} from "@/features/bookingFlow";
import { useState, useEffect } from "react";

export function RestaurantSite({
  restaurant,
  rating,
}) {
  const [bookingState, setBookingState] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const maxGuestCount = 10
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    console.log("Selected date:", selectedDate)
  }, [selectedDate])

  function handleButtonSelectClick(count) {
    // set booking state info here 
    setBookingStep(bookingStep + 1)
  }

  return (
    <div className="h-screen">
      <Logo />
      <Darkbackground>
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between text-sm items-center">
            <p>Kapacitet: {restaurant?.current_capacity}/{restaurant?.capacity}</p>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                index < Math.floor(rating) ? (
                  <AiFillStar key={index} />
                ) : (
                  <AiOutlineStar key={index} />
                )
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between items-center">
              <h2 className="font-semibold text-2xl">{restaurant?.name}</h2>
              <AiFillHeart className="text-red-500 text-2xl" />
            </div>
            <p className="text-xs">{restaurant?.address}</p>
          </div>
          <p className="text-xs">{restaurant?.description}</p>
          <div>
            <Button title="Reserver" onClick={() => { setBookingState(!bookingState) }} />
            <Button title="Reserver" onClick={() => { setBookingStep(bookingStep + 1) }} />
          </div>
          <p className="text-xs">Phone: {restaurant?.phone}</p>
        </div>
        {bookingState && (
          <BookingView >
            <BookingStep
              key={1}
              currentBookingStep={bookingStep === 1}
              title="VÆLG ANTAL PERSONER"
              description="Vælg antal personer til din reservation"
              onClick={() => {
                if (bookingStep !== 1) setBookingStep(1);
              }}
            >
              {Array.from({ length: maxGuestCount }, (_, index) => (
                <ButtonSelect
                  key={index}
                  count={index + 1}
                  onClick={() => handleButtonSelectClick(index + 1)}
                />
              ))}
            </BookingStep>
            {bookingStep >= 2 && (
              <BookingStep
                key={2}
                currentBookingStep={bookingStep === 2}
                title="VÆLG DATO"
                description="Vælg en dato for din reservation"
                onClick={() => setBookingStep(2)}
              >
                <MyDatePicker
                  onDateSelect={setSelectedDate}
                />
              </BookingStep>
            )}
            {bookingStep >= 3 && (
              <BookingStep
                key={3}
                currentBookingStep={bookingStep === 3}
                title="VÆLG TIDSPUNKT"
                description="Vælg et tidspunkt for din reservation"
                onClick={() => setBookingStep(3)}
              >
              </BookingStep>
            )}
          </BookingView>
        )}
      </Darkbackground>
    </div>
  )
}
