import React, { useState } from "react";
import { Form, useFetcher } from "@remix-run/react";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";

export default function Card({ guestCount, first_name, phone, email, comment, datetime, bookingId, restaurantId }) {
    const [date, time] = datetime ? datetime.split(' ') : ["Ingen dato", "Ingen tid"];
    const [year, month, day] = date.split('-');
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('da-DK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const [hours, minutes] = time.split(':');
    const formattedTime = `${hours}:${minutes}`;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const fetcher = useFetcher();

    const isExpired = () => {
        const cardDateTime = new Date(`${date}T${time}`);
        return cardDateTime < new Date();
    };

    if (isExpired()) return null;


    return (
        <>
            <div className="bg-card-gray text-white p-6 rounded-xl shadow-md relative">
                <div className="font-bold text-xl md:text-2xl tracking-wider uppercase font-montserrat stroke-white-200">
                    {first_name || "Unknown Name"}
                </div>
                <div className="absolute top-6 right-6 text-sm text-white font-bold uppercase">
                    {guestCount || 0} personer
                </div>

                <div className="mt-6">
                    <p className="text-sm mt-2"><span className="text-gray-400">Dato |</span> {new Date(date).toLocaleDateString('da-DK', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}</p>
                    <p className="text-sm mt-2"><span className="text-gray-400">Tid |</span> {time}</p>
                    <p className="text-sm mt-2"><span className="text-gray-400">Telefon |</span> {phone || "00 00 00 00"}</p>
                    <p className="text-sm mt-2"><span className="text-gray-400">Email |</span> {email || "N/A"}</p>
                    <p className="text-sm mt-2"><span className="text-gray-400">Kommentar |</span> {comment || "Ingen kommentar"}</p>
                </div>

                <div className="mt-10">
                    <Form action="" method="POST">
                        <input type="hidden" name="intent" value="delete" />
                        <button name="bookingId" value={bookingId} type="submit" className="absolute bottom-4 left-6 text-red-500 uppercase text-xs">
                            Slet reservation
                        </button>
                    </Form>
                </div>

                <div>
                    <button
                        type="button"
                        className="absolute bottom-4 right-6 text-white font-bold uppercase text-xs flex items-center"
                        onClick={openModal}
                    >
                        <FaEdit className="mr-1" /> Rediger
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} closeModal={closeModal} className="small-modal">
                <h2 className="text-2xl text-black font-bold mb-4">Rediger Reservation</h2>
                <Form method="POST">
                    <input type="hidden" name="booking_id" value={bookingId} />
                    <input type="hidden" name="restaurant_id" value={restaurantId} />
                    <input type="hidden" name="intent" value="update" />

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Navn</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={first_name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-black p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">Antal gæster</label>
                        <input
                            type="number"
                            id="guestCount"
                            name="guestCount"
                            defaultValue={guestCount}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-black p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Dato</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            defaultValue={date}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-black p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Tid</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            defaultValue={time}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-black p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Kommentar</label>
                        <textarea
                            id="comment"
                            name="comment"
                            defaultValue={comment}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-black p-2"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded-xl"
                        >
                            Gem ændringer
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded-xl"
                            onClick={closeModal}
                        >
                            Annuller
                        </button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
