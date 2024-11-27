"use client"
import React from 'react'

export function Darkbackground({ children }) {
    return (
        <section className="bg-black text-white w-full h-screen p-6 rounded-t-2xl">
            {children}
        </section>
    )
}