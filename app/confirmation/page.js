"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ConfirmationPage() {
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastBooking");
      if (raw) setBooking(JSON.parse(raw));
      else router.replace("/");
    } catch {
      router.replace("/");
    }
  }, [router]);

  const copyPNR = async () => {
    if (!booking?.bookingId) return;
    try {
      await navigator.clipboard.writeText(booking.bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const printTicket = () => {
    if (typeof window !== "undefined") window.print();
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="px-6 max-w-4xl mx-auto w-full flex-1">
          <div className="py-10">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-yellow-800">
              Preparing your ticket...
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="px-6 max-w-5xl mx-auto w-full flex-1">
        <div className="py-10">
          {/* Success Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 md:p-10 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">
                    Booking Confirmed
                  </div>
                  <div className="text-white/90">
                    Your e-ticket is ready. Please carry a valid ID.
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="opacity-90">PNR / Booking ID</div>
                <div className="text-lg md:text-xl font-mono font-semibold">
                  {booking.bookingId}
                </div>
              </div>
            </div>
          </div>

          {/* Ticket + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:block">
            {/* Ticket Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden print:shadow-none">
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Operator</div>
                    <div className="text-xl font-semibold text-black">
                      {booking.operator}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Departure</div>
                    <div className="text-xl font-semibold text-black">
                      {booking.departureTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Route</div>
                  <div className="font-semibold text-black">
                    {booking.route}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Seats</div>
                  <div className="font-semibold text-black">
                    {booking.selectedSeats.join(", ")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Fare</div>
                  <div className="font-semibold text-black">
                    BDT {booking.grandTotal}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Payment</div>
                  <div className="font-semibold text-black">
                    {booking.payment?.method?.toUpperCase?.() || "Card"}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-xl border p-4 flex items-center justify-between gap-4">
                  {/* QR placeholder */}
                  <div className="w-28 h-28 bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[length:12px_12px] bg-[position:0_0,0_6px,6px_-6px,-6px_0] rounded-md" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">
                      Show this QR at boarding
                    </div>
                    <div className="font-mono text-lg font-semibold">
                      {booking.bookingId}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Name: {booking.passenger?.name || "N/A"} • Phone:{" "}
                      {booking.passenger?.phone || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="bg-gray-50 rounded-2xl border p-6 h-max">
              <div className="text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">PNR</span>
                  <span className="font-mono font-semibold">
                    {booking.bookingId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats</span>
                  <span className="font-semibold">
                    {booking.selectedSeats.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">BDT {booking.subtotal}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span className="text-gray-600">
                    Discount {booking.coupon ? `(${booking.coupon})` : ""}
                  </span>
                  <span className="font-semibold">
                    - BDT {booking.discount}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span>BDT {booking.grandTotal}</span>
                </div>
                <hr />
                <div className="text-xs text-gray-500">
                  An e-ticket has been generated. Carry a valid photo ID
                  matching the passenger name.
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 print:hidden">
                <button
                  onClick={printTicket}
                  className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Print Ticket
                </button>
                <button
                  onClick={copyPNR}
                  className="border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  {copied ? "PNR Copied" : "Copy PNR"}
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="col-span-2 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
