"use client"
import React from "react"
import Image from "next/image"

export function Logo() {
  return (
    <section className="flex w-full h-auto py-2 px-4">
      <div className="max-w-1/2 -ml-3">
        <Image src="/resbook-logo.png" alt="Logo" width={220} height={220} />
      </div>
    </section>
  )
}
