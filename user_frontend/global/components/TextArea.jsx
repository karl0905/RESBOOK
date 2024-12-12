"use client"
import { twMerge } from "tailwind-merge"
import { useState } from "react"

export function Textarea({
  placeholder = "Enter text...",
  variant = "primary",
  disabled = false,
  onChange = () => { },
  className = "",
  rows = 4,
}) {
  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <textarea
      value={value}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder}
      rows={rows}
      className={twMerge(
        `border rounded-lg px-4 py-2 w-full text-sm font-medium text-white focus:outline-none focus:ring-2 transition duration-200 ease-in-out resize-vertical`,
        variant === "primary" &&
        "bg-gray-900 border-gray-600 focus:border-white focus:ring-white hover:bg-gray-800",
        variant === "secondary" &&
        "bg-gray-900 border-gray-600 focus:border-white focus:ring-white hover:bg-gray-800",
        variant === "destructive" &&
        "bg-gray-900 border-gray-600 focus:border-white focus:ring-white hover:bg-gray-800",
        disabled && "bg-gray-700 text-gray-400 cursor-not-allowed",
        className
      )}
    />
  )
}

