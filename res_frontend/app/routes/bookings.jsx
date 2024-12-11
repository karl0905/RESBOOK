import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchBookings } from "../../actions/bookings.js";
import Card from "../../features/bookingDashboard/components/Card";
import Darkbackground from "../../features/dashboard/Darkbackground.jsx";
import Logo from "../../features/dashboard/Logo"
import { Heading } from "../../features/bookingDashboard/components/Heading.jsx";

export async function loader({ request }) {
    try {
        const bookings = await fetchBookings(request);
        return { bookings };
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return json({ error: "Failed to load bookings" });
    }
}

export default function Bookings() {
    const { bookings, error } = useLoaderData();

    if (error) {
        return <div className="text-white">{error}</div>;
    }

    if (!bookings || bookings.length === 0) {
        return <div className="text-white">No bookings available.</div>;
    }

    return (
        < >
            <Logo />
            <Darkbackground >
                <Heading title="Reservations" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings
                        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
                        .map((booking) => (
                            <Card
                                key={booking.ID}
                                guestCount={booking.guest_count}
                                first_name={booking.first_name}
                                last_name={booking.last_name}
                                phone={booking.phone}
                                email={booking.email}
                                comment={booking.comment}
                                datetime={booking.datetime}
                            />
                        ))}
                </div>
            </Darkbackground>
        </>
    );
}