"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

const CITIES = [
  "Dhaka",
  "Sylhet",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Cox's Bazar",
  "Comilla",
]

function todayISO() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

export default function LocationSearch({ compact = false, initial = {} }) {
  const router = useRouter()
  const [from, setFrom] = useState(initial.from || "Dhaka")
  const [to, setTo] = useState(initial.to || "Sylhet")
  const [date, setDate] = useState(initial.date || todayISO())
  const [pax, setPax] = useState(initial.passengers || 1)

  const [showFromSug, setShowFromSug] = useState(false)
  const [showToSug, setShowToSug] = useState(false)
  const [qFrom, setQFrom] = useState("")
  const [qTo, setQTo] = useState("")
  const [error, setError] = useState("")

  const fromOptions = useMemo(() => CITIES.filter((c) => c.toLowerCase().includes(qFrom.toLowerCase())), [qFrom])
  const toOptions = useMemo(() => CITIES.filter((c) => c.toLowerCase().includes(qTo.toLowerCase())), [qTo])

  useEffect(() => {
    setError("")
  }, [from, to, date, pax])

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const submit = (e) => {
    e?.preventDefault?.()
    // Validation
    if (from === to) return setError("From and To can’t be the same.")
    const today = todayISO()
    if (date < today) return setError("Please choose a future date.")
    if (!from || !to) return setError("Please select both locations.")
    if (pax < 1) return setError("Passengers must be at least 1.")

    const params = new URLSearchParams({ from, to, date, passengers: String(pax) })
    router.push(`/search?${params.toString()}`)
  }

  const cardClass = compact
    ? "bg-white/90 backdrop-blur rounded-xl shadow-lg"
    : "bg-white/90 backdrop-blur rounded-2xl shadow-2xl"

  return (
    <form onSubmit={submit} className={`${cardClass} border border-white/40 ${compact ? "p-4" : "p-6"}`}>
      <div className={`grid ${compact ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-6"} gap-3 items-end`}>
        {/* From */}
        <div className="relative">
          <label className="text-xs text-gray-600">From</label>
          <input
            onFocus={() => setShowFromSug(true)}
            onBlur={() => setTimeout(() => setShowFromSug(false), 150)}
            onChange={(e) => {
              setQFrom(e.target.value)
              setFrom(e.target.value)
            }}
            value={from}
            placeholder="City or station"
            className="w-full px-3 py-2 border rounded-lg bg-white"
          />
          {showFromSug && (
            <div className="absolute z-40 mt-1 w-full bg-white border rounded-lg shadow max-h-48 overflow-auto">
              {fromOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setFrom(c)
                    setQFrom("")
                    setShowFromSug(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  {c}
                </button>
              ))}
              {fromOptions.length === 0 && <div className="px-3 py-2 text-gray-500 text-sm">No matches</div>}
            </div>
          )}
        </div>

        {/* Swap */}
        <div className="hidden md:flex justify-center">
          <button type="button" onClick={swap} className="mt-5 px-3 py-2 rounded-lg border hover:bg-gray-50" aria-label="Swap">
            ⇄
          </button>
        </div>

        {/* To */}
        <div className="relative">
          <label className="text-xs text-gray-600">To</label>
          <input
            onFocus={() => setShowToSug(true)}
            onBlur={() => setTimeout(() => setShowToSug(false), 150)}
            onChange={(e) => {
              setQTo(e.target.value)
              setTo(e.target.value)
            }}
            value={to}
            placeholder="City or station"
            className="w-full px-3 py-2 border rounded-lg bg-white"
          />
          {showToSug && (
            <div className="absolute z-40 mt-1 w-full bg-white border rounded-lg shadow max-h-48 overflow-auto">
              {toOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setTo(c)
                    setQTo("")
                    setShowToSug(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50"
                >
                  {c}
                </button>
              ))}
              {toOptions.length === 0 && <div className="px-3 py-2 text-gray-500 text-sm">No matches</div>}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="text-xs text-gray-600">Date</label>
          <input
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-white"
          />
        </div>

        {/* Pax */}
        <div>
          <label className="text-xs text-gray-600">Passengers</label>
          <input
            type="number"
            min={1}
            value={pax}
            onChange={(e) => setPax(parseInt(e.target.value || "1", 10))}
            className="w-full px-3 py-2 border rounded-lg bg-white"
          />
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 mt-5">Search Buses</button>
        </div>
      </div>
      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
    </form>
  )
}

