export default function Darkbackground({ children }) {
  return (
    <div className="bg-black w-full min-h-screen py-6 px-2 rounded-t-2xl flex flex-col">
      {children}
    </div>
  )
}
