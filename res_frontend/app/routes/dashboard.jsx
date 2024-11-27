"use client"
import React, { useState } from "react"
import { Button } from "../../global/components/Button"
import { Input } from "../../global/components/Input"
import Logo from "../../public/resbooklogo.png"

export default function Dashboard() {
  return (
    <div>
      <div className="mx-auto w-[70%] max-w-[70.5rem]">
        <div className="flex items-center h-20">
          <img src={Logo} alt="Logo" className="w-15 h-12" />
          <h2 className="font-bold ml-2">RESBOOK</h2>
        </div>
      </div>
    </div>
  )
}
