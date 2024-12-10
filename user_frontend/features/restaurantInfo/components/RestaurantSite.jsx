"use client"
import {
  Darkbackground,
  Logo,
} from "@/features/dashboard";
import {
  Button,
  Textarea
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
  MyDatePicker,
  TimeButton,
  useBookingStore
} from "@/features/bookingFlow";
import {
  create_booking
} from "@/actions";
import { useState, useEffect } from "react";

export function RestaurantSite({
  restaurant,
  rating,
}) {
  const [bookingState, setBookingState] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const maxGuestCount = 10

  const { setGuestCount, setDate, setTime, setComment, resetBooking } = useBookingStore()

  useEffect(() => {
    resetBooking()
  }, [])

  function increaseStep() {
    setBookingStep(bookingStep + 1)
  }

  const availableTimes = ['11:30', '12:00', '12:30', '13:00', '13:15', '13:45',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  return (
    <div className="h-screen">
      <Logo />
      <Darkbackground>
        <div className="px-3">
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
              <p className="text-sm">{restaurant?.address}</p>
            </div>
            <p className="text-sm">{restaurant?.description}</p>
            {!bookingState &&
              (<div>
                <Button title="Reserver" onClick={() => { setBookingState(!bookingState) }} />
                <p className="text-xs">Phone: {restaurant?.phone}</p>
              </div>
              )}
          </div>
          {bookingState && (
            <BookingView >
              <BookingStep
                key={1}
                currentBookingStep={bookingStep === 1}
                completed={bookingStep > 1}
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
                    selected={useBookingStore.getState().guestCount === index + 1}
                    onClick={() => {
                      setGuestCount(index + 1)
                      increaseStep()
                    }}
                  />
                ))}
              </BookingStep>
              {bookingStep >= 2 && (
                <BookingStep
                  key={2}
                  currentBookingStep={bookingStep === 2}
                  completed={bookingStep > 2}
                  title="VÆLG DATO"
                  description="Vælg en dato for din reservation"
                  onClick={() => setBookingStep(2)}
                >
                  <MyDatePicker
                    onDateSelect={
                      (selectedDate) => {
                        setDate(selectedDate)
                        increaseStep()
                      }}
                  />
                </BookingStep>
              )}
              {bookingStep >= 3 && (
                <BookingStep
                  key={3}
                  currentBookingStep={bookingStep === 3}
                  completed={bookingStep > 3}
                  title="VÆLG TIDSPUNKT"
                  description="Vælg et tidspunkt for din reservation"
                  onClick={() => setBookingStep(3)}
                >
                  {availableTimes.map((time, index) => (
                    <TimeButton
                      key={index}
                      time={time}
                      isSelected={useBookingStore.getState().time ? useBookingStore.getState().time.slice(0, 5) === time : false}
                      onClick={(e) => {
                        e.stopPropagation()
                        setTime(time)
                        increaseStep()
                      }}
                    />
                  ))}
                </BookingStep>
              )}
              {bookingStep >= 4 && (
                <BookingStep
                  key={4}
                  currentBookingStep={bookingStep === 4}
                  completed={bookingStep > 4}
                  title="KOMMENTAR"
                  description="Tilføj en kommentar til din reservation"
                  onClick={() => setBookingStep(4)}
                >
                  <Textarea
                    placeholder="Enter your message..."
                    variant="primary"
                    onChange={(value) => setComment(value)}
                    className="mt-4"
                    rows={6}
                  />
                  <Button
                    title="Reserver"
                    onClick={(e) => {
                      e.stopPropagation()
                      create_booking(useBookingStore.getState(), restaurant.id)
                      resetBooking()
                      setBookingStep(1)
                      setBookingState(false)
                    }}
                  />
                  <Button
                    title="Annuller reservation"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setBookingStep(1)
                      resetBooking()
                      setBookingState(false)
                    }}
                  />
                </BookingStep>
              )}

            </BookingView>
          )}
        </div>
      </Darkbackground>
    </div>
  )
}
