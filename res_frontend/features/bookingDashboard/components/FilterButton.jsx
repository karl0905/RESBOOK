import { Form } from '@remix-run/react';
import React from 'react';

export default function FilterButton({ onClick, label }) {
    return (
        <Form action="" method="POST">
            <button
                onClick={onClick}
                className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200 focus:outline-none"
            >
                {label}
            </button>
        </Form>
    );
};

