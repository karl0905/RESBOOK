export function BookingStep({
  title = "Booking Title",
  description = "Booking Description",
  children,
  currentBookingStep,
  onClick = () => { }
}) {
  return (
    <div
      className={`${!currentBookingStep
        ? 'hover:bg-gray-800 cursor-pointer'
        : ""
        } `}
      onClick={onClick}
    >
      <div className="w-full h-[0.5px] bg-white"></div>
      <h2 className="text-2xl">{title}</h2>
      <p>{description}</p>
      {currentBookingStep && (
        <div className="flex gap-2 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
