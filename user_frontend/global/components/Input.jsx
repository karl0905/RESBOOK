"use client"
import { twMerge } from "tailwind-merge"
import { useState } from "react"

export function Input({
  placeholder = "Enter text...",
  type = "text",
  variant = "primary",
  disabled = false,
  onChange = () => {},
  className = "",
  defaultValue = "",
  max = "",
  min = "",
}) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      max={max}
      min={min}
      className={twMerge(
        "border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 transition duration-150 ease-in-out",
        variant === "primary" &&
          "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
        variant === "secondary" &&
          "border-gray-300 focus:border-secondary-500 focus:ring-secondary-500",
        variant === "destructive" &&
          "border-gray-300 focus:border-destructive-500 focus:ring-destructive-500",
        disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
        className
      )}
    />
  )
}
