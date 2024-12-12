import { Darkbackground, Heading } from "@/features/dashboard"
import { get_bookings } from "@/actions/booking"
import BookingContent from "@/features/bookings/components/BookingContent"

export default async function Page() {
  const bookings = await get_bookings()

  return (
    <Darkbackground>
      <Heading title="Bookings" />
      <BookingContent bookings={bookings} />
    </Darkbackground>
  )
}
