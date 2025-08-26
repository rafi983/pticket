"use client";

export default function BookingForm({
  selectedSeats = [],
  pricePerSeat = 0,
  subtotal = 0,
  discount = 0,
  grandTotal = 0,
  couponInput = "",
  setCouponInput,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  maxSelection = 4,
  onProceed,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const passenger = {
      name: form.passengerName?.value || "",
      phone: form.phoneNumber?.value || "",
      email: form.emailId?.value || "",
    };
    if (typeof onProceed === "function") onProceed(passenger);
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-black mb-6">Your Booking</h3>

      {/* Selected Seats Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center text-sm font-semibold mb-2">
          <span>
            Seat{selectedSeats.length !== 1 ? "s" : ""} ({selectedSeats.length}/
            {maxSelection})
          </span>
          <span>Class</span>
          <span>Price</span>
        </div>
        <div className="space-y-2 text-sm">
          {selectedSeats.length === 0 ? (
            <div className="text-gray-500">No seats selected yet.</div>
          ) : (
            selectedSeats.map((s) => (
              <div key={s} className="flex justify-between">
                <span>{s}</span>
                <span>Economy</span>
                <span>{pricePerSeat}</span>
              </div>
            ))
          )}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>BDT {subtotal}</span>
        </div>
        <div className="flex justify-between font-semibold text-green-700">
          <span>
            Discount{" "}
            {appliedCoupon && !appliedCoupon.invalid
              ? `(${appliedCoupon.code})`
              : ""}
          </span>
          <span>- BDT {discount}</span>
        </div>
        <div className="mt-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Have any coupon?"
              value={couponInput}
              onChange={(e) => setCouponInput?.(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            {appliedCoupon ? (
              <button
                type="button"
                onClick={onRemoveCoupon}
                className="px-3 py-2 border border-red-500 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50"
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={onApplyCoupon}
                className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600"
              >
                Apply
              </button>
            )}
          </div>
          {appliedCoupon?.invalid && (
            <div className="text-sm text-red-600 mt-1">
              Invalid coupon code.
            </div>
          )}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>BDT {grandTotal}</span>
        </div>
      </div>

      {/* Passenger Details Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Passenger Name*
          </label>
          <input
            name="passengerName"
            type="text"
            placeholder="Enter your name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Phone Number*
          </label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            required
            pattern="[0-9]{6,15}"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Email ID
          </label>
          <input
            name="emailId"
            type="email"
            placeholder="Enter your email id"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          disabled={selectedSeats.length === 0}
          className="w-full bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
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
  );
}
