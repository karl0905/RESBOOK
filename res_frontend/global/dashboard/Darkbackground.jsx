"use client"
import React from 'react'

const DarkBackground = ({ children }) => {
    return (
        <section className="bg-black text-white w-full h-screen p-6 rounded-t-2xl">
            {children}
        </section>
    )
}

export default DarkBackground
