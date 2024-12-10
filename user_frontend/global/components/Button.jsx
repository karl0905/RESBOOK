"use client"
import { twJoin } from "tailwind-merge"

export function Button({
  title = "Button",
  variant = "primary",
  disabled = false,
  onClick = () => { }
}) {
  return (
    <button
      className={twJoin(
        'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out',
        // Primary Button: White background with dark border and text, strong hover effect
        variant === 'primary' && 'bg-white text-black border-2 border-black hover:bg-gray-100 hover:border-gray-700',
        // Secondary Button: Transparent background with subtle hover effects
        variant === 'secondary' && 'bg-transparent text-white border-2 border-gray-600 hover:bg-gray-800 hover:border-white',
        // Destructive Button: Red background with hover effects
        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700 border-transparent hover:border-red-700',
        // Disabled State
        disabled && 'bg-gray-300 text-gray-500 cursor-not-allowed',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

