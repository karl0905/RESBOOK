import React from 'react';

export default function FilterButton({ onClick, label }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 focus:outline-none"
        >
            {label}
        </button>
    );
};

