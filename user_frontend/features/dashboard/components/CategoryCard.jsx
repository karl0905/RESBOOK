export function CategoryCard({ Icon, title, subtitle }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center hover:scale-95 transition-transform duration-200">
            <div className="text-3xl sm:text-5xl text-green-500 mb-2 sm:mb-4">
                {Icon}
            </div>
            <h3 className="text-sm sm:text-lg text-green-800 font-semibold text-center">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 text-center">{subtitle}</p>
        </div>
    );
}