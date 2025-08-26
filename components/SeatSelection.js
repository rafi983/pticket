import SeatButton from "../app/SeatButton"

export default function SeatSelection() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-black mb-6">Select Your Seat</h3>

      <div className="flex items-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-green-600">Selected</span>
        </div>
      </div>

      {/* Driver Position */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
        {/* Row A */}
        <div className="text-center font-semibold text-gray-600">A</div>
        <SeatButton seat="A1" />
        <SeatButton seat="A2" />
        <SeatButton seat="A3" />
        <SeatButton seat="A4" />

        {/* Row B */}
        <div className="text-center font-semibold text-gray-600">B</div>
        <SeatButton seat="B1" />
        <SeatButton seat="B2" />
        <SeatButton seat="B3" />
        <SeatButton seat="B4" />

        {/* Row C */}
        <div className="text-center font-semibold text-gray-600">C</div>
        <SeatButton seat="C1" />
        <SeatButton seat="C2" />
        <SeatButton seat="C3" />
        <SeatButton seat="C4" />

        {/* Row D */}
        <div className="text-center font-semibold text-gray-600">D</div>
        <SeatButton seat="D1" />
        <SeatButton seat="D2" />
        <SeatButton seat="D3" selected />
        <SeatButton seat="D4" />

        {/* Row E */}
        <div className="text-center font-semibold text-gray-600">E</div>
        <SeatButton seat="E1" selected />
        <SeatButton seat="E2" />
        <SeatButton seat="E3" />
        <SeatButton seat="E4" />

        {/* Row F */}
        <div className="text-center font-semibold text-gray-600">F</div>
        <SeatButton seat="F1" />
        <SeatButton seat="F2" />
        <SeatButton seat="F3" />
        <SeatButton seat="F4" />

        {/* Row G */}
        <div className="text-center font-semibold text-gray-600">G</div>
        <SeatButton seat="G1" />
        <SeatButton seat="G2" selected />
        <SeatButton seat="G3" />
        <SeatButton seat="G4" />

        {/* Row H */}
        <div className="text-center font-semibold text-gray-600">H</div>
        <SeatButton seat="H1" />
        <SeatButton seat="H2" />
        <SeatButton seat="H3" />
        <SeatButton seat="H4" />

        {/* Row I */}
        <div className="text-center font-semibold text-gray-600">I</div>
        <SeatButton seat="I1" />
        <SeatButton seat="I2" />
        <SeatButton seat="I3" />
        <SeatButton seat="I4" />

        {/* Row J */}
        <div className="text-center font-semibold text-gray-600">J</div>
        <SeatButton seat="J1" />
        <SeatButton seat="J2" />
        <SeatButton seat="J3" />
        <SeatButton seat="J4" />
      </div>
    </div>
  )
}

