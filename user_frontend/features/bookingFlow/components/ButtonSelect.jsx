export function ButtonSelect({
  count,
  onClick
}) {
  return (
    <button
      className="rounded-full text-black bg-primary-foreground h-8 w-8 hover:bg-gray-400"
      onClick={onClick}
    >
      {count}
    </button>
  )
}
