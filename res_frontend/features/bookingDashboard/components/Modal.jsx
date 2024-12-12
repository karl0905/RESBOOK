import { useNavigate } from "@remix-run/react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ children }) {
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1);
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
            onClick={handleOutsideClick}
        >
            <div className="w-5/6 bg-white relative rounded-2xl p-11">
                <button
                    className="absolute z-50 top-2 left-2 m-2 text-black"
                    onClick={closeModal}
                >
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>
    );
}
