"use client"
import { twJoin } from "tailwind-merge"

export function Button({
  title = "Button",
  variant = "primary",
  disabled = false,
  onClick = () => {},
}) {
  return (
    <button
      className={twJoin(
        "rounded-md px-4 py-1",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : variant === "secondary"
          ? "bg-transparent border border-secondary text-secondary-foreground hover:bg-secondary/80"
          : variant === "destructive" &&
            "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
