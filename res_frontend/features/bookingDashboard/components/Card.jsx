// Card.jsx
import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { FaTimes, FaEdit, FaSave } from "react-icons/fa";

export default function Card({ guestCount, first_name, phone, email, comment, datetime, bookingId, onUpdate }) {
    const [date, time] = datetime ? datetime.split(' ') : ["Ingen dato", "Ingen tid"];
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('da-DK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const [hours, minutes] = time.split(':');
    const formattedTime = `${hours}:${minutes}`;

    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');

    const isExpired = () => {
        const cardDateTime = new Date(`${date}T${time}`);
        return cardDateTime < new Date();
    };

    const handleEdit = (field, value) => {
        setEditingField(field);
        setEditValue(value);
    };

    const handleSave = () => {
        onUpdate({ [editingField]: editValue });
        setEditingField(null);
    };

    const EditableField = ({ label, value, name }) => (
        <div className="text-sm mt-2 flex items-center justify-between">
            <span>
                <span className="text-gray-400">{label} |</span>
                {editingField === name ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                    />
                ) : (
                    <span>{value}</span>
                )}
            </span>
            {editingField === name ? (
                <button onClick={handleSave} className="text-green-400 hover:text-green-300 transition-colors">
                    <FaSave />
                </button>
            ) : (
                <button onClick={() => handleEdit(name, value)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FaEdit />
                </button>
            )}
        </div>
    );

    if (isExpired()) {
        return null;
    }

    return (
        <div className="bg-card-gray text-white p-6 rounded-xl shadow-md relative">
            <div className="font-bold text-xl md:text-2xl tracking-wider uppercase font-montserrat stroke-white-200">
                {first_name || "Unknown Name"}
            </div>
            <div className="absolute top-6 right-6 text-sm text-white font-bold uppercase">
                {guestCount || 0} personer
            </div>

            <div className="mt-6">
                <EditableField label="Dato" value={formattedDate} name="date" />
                <EditableField label="Tid" value={formattedTime} name="time" />
                <EditableField label="Telefon" value={phone || "00 00 00 00"} name="phone" />
                <EditableField label="Email" value={email || "N/A"} name="email" />
                <EditableField label="Kommentar" value={comment || "Ingen kommentar"} name="comment" />
            </div>

            <div className="mt-10">
                <Form action="" method="POST">
                    <button name="bookingId" value={bookingId} type="submit" className="absolute bottom-4 left-6 text-red-500 uppercase text-xs">
                        Slet reservation
                    </button>
                </Form>
            </div>
        </div>
    );
}
