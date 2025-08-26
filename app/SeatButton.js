export default function SeatButton({ seat, selected = false }) {
  return (
    <button
      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${
        selected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {seat}
    </button>
  )
}
