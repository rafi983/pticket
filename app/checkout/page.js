"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

function formatTime(ms) {
  if (ms < 0) ms = 0
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default function CheckoutPage() {
  const router = useRouter()
  const [pending, setPending] = useState(null)
  const [now, setNow] = useState(Date.now())
  const [method, setMethod] = useState("card")
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  // Load pending booking from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pendingBooking")
      if (raw) setPending(JSON.parse(raw))
    } catch {}
  }, [])

  // Tick timer every second
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const msLeft = useMemo(() => {
    if (!pending) return 0
    return (pending.holdExpiresAt || 0) - now
  }, [pending, now])

  const expired = msLeft <= 0

  useEffect(() => {
    if (pending === null) return
    if (!pending) return
    if (expired) {
      // Clear the pending booking and send user back
      try {
        localStorage.removeItem("pendingBooking")
      } catch {}
      setTimeout(() => router.replace("/"), 1500)
    }
  }, [expired, pending, router])

  // If no pending booking, route home
  useEffect(() => {
    if (pending === null) return
    if (!pending) router.replace("/")
  }, [pending, router])

  const simulatePayment = async (status = "success") => {
    setProcessing(true)
    setError("")
    await new Promise((r) => setTimeout(r, 1500))

    if (expired) {
      setProcessing(false)
      setError("Hold expired. Please start over.")
      return
    }

    const paymentRef = `PAY-${Date.now()}`
    const bookingId = `PTK-${Math.floor(Date.now() / 1000)}`
    const result = {
      ...pending,
      bookingId,
      status: status === "success" ? "CONFIRMED" : "FAILED",
      payment: {
        method,
        reference: paymentRef,
        status,
        paidAt: status === "success" ? Date.now() : null,
      },
    }
    try {
      // Save confirmation for the confirmation page
      localStorage.setItem("lastBooking", JSON.stringify(result))
      // Append to bookings history on success
      if (status === "success") {
        const raw = localStorage.getItem("bookings")
        const arr = raw ? JSON.parse(raw) : []
        arr.unshift(result)
        localStorage.setItem("bookings", JSON.stringify(arr))
      }
      localStorage.removeItem("pendingBooking")
    } catch {}

    setProcessing(false)
    if (status === "success") router.push("/confirmation")
    else setError("Payment failed. Try again or choose another method.")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="px-6 max-w-4xl mx-auto w-full flex-1">
        <div className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-black">Checkout</h1>
            <div className={`text-sm font-mono px-3 py-1 rounded-full ${expired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              Hold: {formatTime(msLeft)}
            </div>
          </div>

          {pending && !expired && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-5 border">
                <h2 className="font-semibold text-black mb-3">Trip Summary</h2>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">Operator</span><span className="font-medium">{pending.operator}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Route</span><span className="font-medium">{pending.route}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Departure</span><span className="font-medium">{pending.departureTime}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Seats</span><span className="font-medium">{pending.selectedSeats.join(", ")}</span></div>
                </div>
                <hr className="my-4" />
                <div className="text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-semibold">BDT {pending.subtotal}</span></div>
                  <div className="flex justify-between text-green-700"><span className="text-gray-600">Discount {pending.coupon ? `(${pending.coupon})` : ""}</span><span className="font-semibold">- BDT {pending.discount}</span></div>
                  <div className="flex justify-between text-lg font-bold"><span>Grand Total</span><span>BDT {pending.grandTotal}</span></div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl p-5 border">
                <h2 className="font-semibold text-black mb-3">Payment</h2>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" checked={method === "card"} onChange={() => setMethod("card")} />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-gray-500">Visa, Mastercard</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="method" checked={method === "wallet"} onChange={() => setMethod("wallet")} />
                    <div>
                      <div className="font-medium">Mobile Wallet</div>
                      <div className="text-gray-500">bKash/Nagad/Rocket</div>
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    disabled={processing}
                    onClick={() => simulatePayment("success")}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-green-300"
                  >
                    {processing ? "Processing..." : "Pay Now"}
                  </button>
                  <button
                    disabled={processing}
                    onClick={() => simulatePayment("fail")}
                    className="px-4 py-3 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Simulate Fail
                  </button>
                </div>

                {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
              </div>
            </div>
          )}

          {!pending && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-yellow-800">No pending booking found. Redirecting…</div>
          )}

          {expired && pending && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-800 mt-6">Seat hold expired. Redirecting…</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
