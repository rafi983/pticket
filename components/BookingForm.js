export default function BookingForm() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-black mb-6">Select Your Seat</h3>

      {/* Selected Seats Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center text-sm font-semibold mb-2">
          <span>Seat 2</span>
          <span>Class</span>
          <span>Price</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>C2</span>
            <span>Economy</span>
            <span>550</span>
          </div>
          <div className="flex justify-between">
            <span>C2</span>
            <span>Economy</span>
            <span>550</span>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-semibold">
          <span>Total Price</span>
          <span>BDT 1100</span>
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Have any coupon?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-2 text-sm font-semibold hover:bg-green-600 transition-colors">
            Apply
          </button>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>BDT 1100</span>
        </div>
      </div>

      {/* Passenger Details Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Passenger Name*</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Phone Number*</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Email ID</label>
          <input
            type="email"
            placeholder="Enter your email id"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Next
        </button>
        <div className="flex justify-between text-xs text-gray-500 mt-4">
          <a href="#" className="hover:text-green-600">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-green-600">
            Cancellation Policy
          </a>
        </div>
      </form>
    </div>
  )
}



