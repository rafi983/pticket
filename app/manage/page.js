"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

function fmtDate(ts) {
  try {
    const d = new Date(ts)
    return d.toLocaleString()
  } catch {
    return ""
  }
}

export default function ManagePage() {
  const router = useRouter()
  const [bookings, setBookings] = useState([])
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [message, setMessage] = useState("")

  // Load booking history
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bookings")
      setBookings(raw ? JSON.parse(raw) : [])
    } catch {
      setBookings([])
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bookings
      .filter((b) => (statusFilter === "all" ? true : b.status === statusFilter.toUpperCase()))
      .filter((b) => {
        if (!q) return true
        const hay = [
          b.bookingId,
          b.operator,
          b.route,
          b.passenger?.name,
          b.passenger?.phone,
          b.selectedSeats?.join(", "),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        return hay.includes(q)
      })
  }, [bookings, query, statusFilter])

  const saveBookings = (next) => {
    setBookings(next)
    try {
      localStorage.setItem("bookings", JSON.stringify(next))
    } catch {}
  }

  const copyPNR = async (pnr) => {
    try {
      await navigator.clipboard.writeText(pnr)
      setMessage("PNR copied")
      setTimeout(() => setMessage(""), 1500)
    } catch {}
  }

  const viewTicket = (b) => {
    try {
      localStorage.setItem("lastBooking", JSON.stringify(b))
    } catch {}
    router.push("/confirmation")
  }

  const printTicket = (b) => {
    viewTicket(b)
    setTimeout(() => window.print(), 300)
  }

  const cancelBooking = (bookingId) => {
    const idx = bookings.findIndex((x) => x.bookingId === bookingId)
    if (idx === -1) return
    const b = bookings[idx]
    if (b.status !== "CONFIRMED") {
      setMessage("Only confirmed bookings can be canceled")
      setTimeout(() => setMessage(""), 1500)
      return
    }
    // Confirm cancel
    const ok = window.confirm("Cancel this booking and issue a refund?")
    if (!ok) return

    const updated = { ...b, status: "CANCELED", canceledAt: Date.now(), refund: { amount: b.grandTotal, method: b.payment?.method || "card", status: "INITIATED" } }
    const next = [...bookings]
    next[idx] = updated
    saveBookings(next)
    setMessage("Booking canceled. Refund initiated.")
    setTimeout(() => setMessage(""), 2000)
  }

  const clearHistory = () => {
    const ok = window.confirm("Clear all saved bookings from this device?")
    if (!ok) return
    saveBookings([])
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="px-6 max-w-6xl mx-auto w-full flex-1">
        <div className="py-10">
          {/* Hero */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold">Manage Bookings</div>
                <div className="text-white/80">Search, view, print, or cancel your tickets</div>
              </div>
              <div className="flex gap-3">
                <button onClick={clearHistory} className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10">Clear History</button>
                <button onClick={() => router.push("/")} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white">New Booking</button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white border rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by PNR, name, phone, route, seats"
                className="px-3 py-2 border rounded-lg"
              />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
                <option value="all">All statuses</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="FAILED">Failed</option>
                <option value="CANCELED">Canceled</option>
              </select>
              <div className="text-sm text-gray-500 flex items-center">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
            </div>
          </div>

          {message && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">{message}</div>}

          {/* List */}
          {filtered.length === 0 ? (
            <div className="bg-gray-50 border border-dashed rounded-2xl p-10 text-center text-gray-600">
              No bookings yet. Complete a booking to see it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((b) => (
                <div key={b.bookingId} className="rounded-2xl border shadow-sm overflow-hidden">
                  <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">PNR</div>
                      <div className="font-mono font-semibold">{b.bookingId}</div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        b.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : b.status === "CANCELED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <div className="p-4 text-sm space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Operator</span><span className="font-medium">{b.operator}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Route</span><span className="font-medium">{b.route}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Departure</span><span className="font-medium">{b.departureTime}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Seats</span><span className="font-medium">{b.selectedSeats?.join(", ")}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Paid</span><span className="font-semibold">BDT {b.grandTotal}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Method</span><span className="font-medium">{b.payment?.method?.toUpperCase?.() || "CARD"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Booked</span><span className="font-medium">{fmtDate(b.createdAt)}</span></div>
                    {b.canceledAt && (
                      <div className="flex justify-between"><span className="text-gray-600">Canceled</span><span className="font-medium">{fmtDate(b.canceledAt)}</span></div>
                    )}
                  </div>

                  <div className="p-4 grid grid-cols-2 gap-3 border-t">
                    <button onClick={() => viewTicket(b)} className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">View Ticket</button>
                    <button onClick={() => printTicket(b)} className="border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50">Print</button>
                    <button onClick={() => copyPNR(b.bookingId)} className="border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50">Copy PNR</button>
                    <button
                      onClick={() => cancelBooking(b.bookingId)}
                      disabled={b.status !== "CONFIRMED"}
                      className="border border-red-400 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

