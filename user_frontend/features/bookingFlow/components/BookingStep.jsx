import { useEffect, useState } from "react";

export function BookingStep({
  title = "Booking Title",
  description = "Booking Description",
  children,
  currentBookingStep,
  completed = false,
  onClick = () => { },
}) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (currentBookingStep) {
      setIsContentVisible(true);
    } else {
      setIsContentVisible(false);
    }
  }, [currentBookingStep]);

  return (
    <div onClick={onClick}>
      <div className="w-full h-[0.5px] bg-white"></div>
      <div
        className={`py-5 ${!currentBookingStep ? "active:bg-gray-800 cursor-pointer" : ""}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl">{title}</h2>
          {completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${isContentVisible
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
            }`}
        >
          <p className="py-2 text-sm">{description}</p>
          <div className="flex gap-2 flex-wrap py-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
