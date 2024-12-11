import React from "react";

export default function Card({ guestCount, first_name, phone, email, comment, datetime }) {
    const [date, time] = datetime ? datetime.split(' ') : ["Ingen dato", "Ingen tid"];
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('da-DK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const [hours, minutes] = time.split(':');
    const formattedTime = `${hours}:${minutes}`;

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
        </div>
    );
}
