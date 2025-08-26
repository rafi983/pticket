"use client";

export default function SeatButton({
  seat,
  selected = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Seat ${seat}${selected ? " selected" : ""}`}
      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : selected
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {seat}
    </button>
  );
}
