"use client"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export function Checkmark({
  text = null,
  size = "md",
  disabled = false,
  defaultSelected = false,
  onChange = () => { }
}) {
  const [isSelected, setIsSelected] = useState(defaultSelected);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      const newSelectedState = !isSelected;
      setIsSelected(newSelectedState);
      onChange(newSelectedState);
    }
  };

  const containerClasses = twMerge(
    "inline-flex items-center gap-2 rounded-md p-2 transition-colors duration-200 ease-in-out",
    disabled ? "opacity-50 cursor-default" : "cursor-pointer",
    !disabled && isHovered && "bg-primary/10",
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
  );

  const iconClasses = twMerge(
    "transition-colors duration-200 ease-in-out flex-shrink-0",
    isSelected ? "text-primary" : "text-gray-500",
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
  );

  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={disabled ? -1 : 0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={containerClasses}
    >
      {text && (
        <span className={twMerge(
          "whitespace-nowrap",
          isSelected ? "text-primary" : "text-gray-700"
        )}>
          {text}
        </span>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={iconClasses}
      >
        {isSelected ? (
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        ) : (
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        )}
      </svg>
    </div>
  );
}

