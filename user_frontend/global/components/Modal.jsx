"use client"

export default function Modal({ children, isOpen, closeModal }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="w-5/6 h-5/6 bg-white relative">
        <button
          className="absolute z-50 top-10 left-10 m-2 text-black"
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}
