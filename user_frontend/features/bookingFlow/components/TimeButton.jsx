import React from 'react';

export function TimeButton({
  time,
  isSelected = false,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg px-4 py-2 text-sm font-semibold
        ${isSelected
          ? 'bg-transparent text-white border-2 border-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground'
          : 'bg-transparent text-white border-2 border-gray-600 hover:bg-gray-700'}
        transition-all duration-300 ease-in-out transform hover:scale-105
      `}
    >
      {time}
    </button>
  );
};

