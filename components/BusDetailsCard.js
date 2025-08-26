export default function BusDetailsCard() {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">Greenline Paribahan</h2>
            <p className="text-gray-600">Coach-009-WEB | AC Business</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          40 Seats left
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Route</span>
          <p className="font-semibold text-black">Dhaka - Sylhet</p>
        </div>
        <div>
          <span className="text-gray-600">Departure Time</span>
          <p className="font-semibold text-black">9:00 PM</p>
        </div>
        <div className="md:col-span-2 flex gap-4">
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Boarding Point - Laxmipur</div>
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Dropping Point - Bogura</div>
          <div className="bg-gray-200 px-3 py-1 rounded text-xs">Est. Time - 11 Hour</div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <div className="text-right">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold">৳</span>
          </div>
          <div className="text-2xl font-bold text-black">550 Taka</div>
          <div className="text-gray-600 text-sm">Per Seat</div>
        </div>
      </div>
    </div>
  )
}

