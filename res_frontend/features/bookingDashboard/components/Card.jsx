import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

export default function Card({ guestCount, first_name, phone, email, comment, datetime, bookingId }) {
    const [date, time] = datetime ? datetime.split(' ') : ["Ingen dato", "Ingen tid"];
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('da-DK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const [hours, minutes] = time.split(':');
    const formattedTime = `${hours}:${minutes}`;

    const isExpired = () => {
        const cardDateTime = new Date(`${date}T${time}`);
        return cardDateTime < new Date();
    };

    if (isExpired()) {
        return null;
    }

    const [showModal, setShowModal] = useState(false);

    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="bg-card-gray text-white p-6 rounded-xl shadow-md relative">
            <div className="font-bold text-xl md:text-2xl tracking-wider uppercase font-montserrat stroke-white-200">
                {first_name || "Unknown Name"}
            </div>
            <div className="absolute top-6 right-6 text-sm text-white font-bold uppercase">
                {guestCount || 0} personer
            </div>

            <div className="mt-6">
                <p className="text-sm mt-2">
                    <span className="text-gray-400">Dato |</span> {formattedDate}
                </p>
                <p className="text-sm mt-2">
                    <span className="text-gray-400">Tid |</span> {formattedTime}
                </p>
                <p className="text-sm mt-2">
                    <span className="text-gray-400">Telefon |</span> {phone || "00 00 00 00"}
                </p>
                <p className="text-sm mt-2">
                    <span className="text-gray-400">Email |</span> {email || "N/A"}
                </p>
                <p className="text-sm mt-2">
                    <span className="text-gray-400">Kommentar |</span> {comment || "Ingen kommentar"}
                </p>
            </div>
            <div className="mt-10">
                <Form action="" method="POST">
                    <button name="bookingId" value={bookingId} type="submit" className="absolute bottom-4 left-6 text-red-500 uppercase text-xs">
                        Slet reservation
                    </button>
                </Form>
            </div>
            <div>
                <Form action="" medthod="PUT">
                    <button
                        type="button"
                        value={bookingId}
                        type="submit"
                        className="absolute bottom-4 right-6 text-green-400 uppercase text-xs flex items-center"
                        onClick={handleEditClick}
                    >
                        <FaEdit className="mr-1" /> Rediger
                    </button>
                </Form>
            </div>
        </div>
    );
}
