"use client"
import React from 'react'

export function Darkbackground({ children }) {
    return (
        <section className="bg-black text-white w-full h-full md:h-max py-6 px-2 rounded-t-2xl flex flex-col">
            {children}
        </section>
    )
}