"use client";

import SeatButton from "../app/SeatButton";
import { Fragment } from "react";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seatsPerRow = 4;

export default function SeatSelection({
  selectedSeats = [],
  onToggleSeat,
  disabledSeats = new Set(),
}) {
  const isSelected = (seat) => selectedSeats.includes(seat);
  const isDisabled = (seat) => disabledSeats.has(seat);

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-black mb-6">Select Your Seat</h3>

      <div className="flex items-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-green-600">
            Selected ({selectedSeats.length})
          </span>
        </div>
      </div>

      {/* Driver Position */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
        {rows.map((row) => (
          <Fragment key={row}>
            <div className="text-center font-semibold text-gray-600">{row}</div>
            {Array.from({ length: seatsPerRow }).map((_, idx) => {
              const seat = `${row}${idx + 1}`;
              return (
                <SeatButton
                  key={seat}
                  seat={seat}
                  selected={isSelected(seat)}
                  disabled={isDisabled(seat)}
                  onClick={() => onToggleSeat?.(seat)}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
