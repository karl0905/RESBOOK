import { FaUtensils, FaHeart, FaStore, FaSearch, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    if (path === "/login" || path === "/signup") {
        return null;
    }

    const getIconColor = (paths) => {
        if (paths.includes("/") && (path === "/" || path.includes("/restaurant"))) {
            return "text-green-600";
        }
        return paths.some((p) => p !== "/" && path.includes(p))
            ? "text-green-600"
            : "text-gray-400";
    };

    return (
        <nav className="fixed bottom-0 w-full py-1 bg-card-dark-gray text-white shadow-lg z-30">
            <ul className="flex justify-center items-center gap-20 py-2">
                <li className="flex flex-col items-center">
                    <Link to="/dashboard" className="flex flex-col items-center w-16">
                        <FaUtensils
                            className={`${getIconColor(["/dashboard"])} text-lg sm:text-2xl`}
                        />
                        <span className="text-xs sm:text-sm pt-2">Restauranter</span>
                    </Link>
                </li>
                <li className="flex flex-col items-center">
                    <Link to="/bookings" className="flex flex-col items-center w-16">
                        <FaStore
                            className={`${getIconColor(["/bookings"])} text-lg sm:text-2xl`}
                        />
                        <span className="text-xs sm:text-sm pt-2">Bookings</span>
                    </Link>
                </li>
                <li className="flex flex-col items-center">
                    <Link to="/profile" className="flex flex-col items-center w-16">
                        <FaUser
                            className={`${getIconColor(["/profile"])} text-lg sm:text-2xl`}
                        />
                        <span className="text-xs sm:text-sm pt-2">Profil</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
