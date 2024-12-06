import React from 'react';
import Link from 'next/link';
import { FaUtensils, FaHeart, FaStore, FaSearch, FaUser } from 'react-icons/fa';

export function Navbar() {
    return (
        <nav className="fixed bottom-0 w-full py-1 bg-card-dark-gray text-white shadow-lg z-30">
            <ul className="flex justify-around items-center py-2">
                <li className="flex flex-col items-center">
                    <Link href="/userDashboard" className="flex flex-col items-center">
                        <FaUtensils className="text-green-600 text-lg sm:text-2xl" />
                        <span className="text-xs sm:text-sm pt-2">Restauranter</span>
                    </Link>
                </li>
                <li className="flex flex-col items-center">
                    <Link href="/favorites" className="flex flex-col items-center">
                        <FaHeart className="text-gray-400 text-lg sm:text-2xl" />
                        <span className="text-xs sm:text-sm pt-2">Favoritter</span>
                    </Link>
                </li>
                <li className="flex flex-col items-center">
                    <a href="#bookings" className="flex flex-col items-center">
                        <FaStore className="text-gray-400 text-lg sm:text-2xl" />
                        <span className="text-xs sm:text-sm pt-2">Bookings</span>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a href="#sog" className="flex flex-col items-center">
                        <FaSearch className="text-gray-400 text-lg sm:text-2xl" />
                        <span className="text-xs sm:text-sm pt-2">Søg</span>
                    </a>
                </li>
                <li className="flex flex-col items-center">
                    <a href="#profil" className="flex flex-col items-center">
                        <FaUser className="text-gray-400 text-lg sm:text-2xl" />
                        <span className="text-xs sm:text-sm pt-2">Profil</span>
                    </a>
                </li>
            </ul>
        </nav >
    );
};