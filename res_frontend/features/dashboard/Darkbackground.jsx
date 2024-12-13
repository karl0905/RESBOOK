export default function Darkbackground({ children }) {
  return (
    <div className="bg-black w-full min-h-screen py-6 px-4 rounded-t-2xl flex flex-col font-monda flex-grow">
      {children}
    </div>
  )
}
