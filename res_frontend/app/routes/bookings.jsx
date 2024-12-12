import React, { useState } from 'react';
import { useLoaderData } from "@remix-run/react";
import { fetchBookings, deleteBooking, updateBooking } from "../../actions/bookings.js";
import Card from "../../features/bookingDashboard/components/Card";
import Darkbackground from "../../features/dashboard/Darkbackground.jsx";
import Logo from "../../features/dashboard/Logo"
import { Heading } from "../../features/bookingDashboard/components/Heading.jsx";
import FilterButton from "../../features/bookingDashboard/components/FilterButton.jsx";

export async function loader({ request }) {
    try {
        const bookings = await fetchBookings(request);
        return { bookings };
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return json({ error: "Failed to load bookings" });
    }
}

export async function action({ request }) {
    try {
        const formData = await request.formData();
        const intent = formData.get("intent");

        if (intent === "delete") {
            const response = await deleteBooking(request);
            return json(response);
        } else if (intent === "update") {
            const response = await updateBooking(request);
            return json(response);
        }
    }
    catch (error) {
        console.error("Error processing action:", error);
        return json({ error: "Failed to process action" });
    }
}

export default function Bookings() {
    const { bookings: initialBookings, error } = useLoaderData();
    const [bookings, setBookings] = useState(initialBookings);
    const [filter, setFilter] = useState('all');

    const handleFilterToday = () => setFilter('today');
    const handleFilterUpcoming = () => setFilter('upcoming');

    const filteredBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.datetime);
        const now = new Date();

        if (filter === 'today') {
            return bookingDate.toDateString() === now.toDateString();
        } else if (filter === 'upcoming') {
            return bookingDate > now;
        } else {
            return true;
        }
    });

    const handleDelete = async (bookingId) => {
        try {
            await deleteBooking(bookingId);
            setBookings(bookings.filter(booking => booking.ID !== bookingId));
        } catch (error) {
            console.error("Failed to delete booking:", error);
        }
    };

    const handleUpdate = async (bookingId, updatedData) => {
        try {
            const response = await updateBooking({ ...updatedData, bookingId });
            setBookings(bookings.map(booking =>
                booking.ID === bookingId ? { ...booking, ...updatedData } : booking
            ));
        } catch (error) {
            console.error("Failed to update booking:", error);
        }
    };

    if (error) {
        return <div className="text-white">{error}</div>;
    }

    if (!bookings || bookings.length === 0) {
        return <div className="text-white">No bookings available.</div>;
    }

    return (
        <>
            <Logo />
            <Darkbackground>
                <div className="relative flex justify-between items-center">
                    <Heading title="Reservations" />
                    <div className="absolute right-0 flex gap-2">
                        <FilterButton label="Idag" onClick={handleFilterToday} />
                        <FilterButton label="Kommende" onClick={handleFilterUpcoming} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBookings
                        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
                        .map((booking) => (
                            <Card
                                key={booking.ID}
                                bookingId={booking.ID}
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
