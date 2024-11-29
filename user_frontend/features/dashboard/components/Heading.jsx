import React from 'react'

export function Heading({ title, className = "" }) {
    return (
        <section>
            <h1 className={`text-white text-3xl font-bold uppercase pb-8 px-4 ${className}`}>
                {title}
            </h1>
        </section>
    )
}