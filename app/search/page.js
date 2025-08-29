"use client";

import { useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LocationSearch from "../../components/LocationSearch";

const OPERATORS = [
  "Greenline Paribahan",
  "Shohag Elite",
  "Hanif Enterprise",
  "ENA",
  "Soudia Coach",
];

function generateTrips({ from, to, date }) {
  const baseTimes = [
    "07:30 AM",
    "10:15 AM",
    "01:00 PM",
    "04:45 PM",
    "08:00 PM",
    "10:30 PM",
  ];
  return baseTimes.map((t, idx) => {
    const operator = OPERATORS[idx % OPERATORS.length];
    const price = 450 + (idx % 3) * 50 + (operator.startsWith("G") ? 50 : 0);
    const seatsLeft = 10 + ((idx * 7) % 25);
    return {
      id: `${operator}-${t}`,
      operator,
      from,
      to,
      date,
      departureTime: t,
      durationHrs: 6 + (idx % 3),
      price,
      seatsLeft,
      coach: idx % 2 === 0 ? "AC Business" : "Non-AC",
    };
  });
}

function SearchContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const from = sp.get("from") || "Dhaka";
  const to = sp.get("to") || "Sylhet";
  const date = sp.get("date") || new Date().toISOString().slice(0, 10);
  const passengers = parseInt(sp.get("passengers") || "1", 10);

  const [operatorFilter, setOperatorFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sort, setSort] = useState("price-asc");

  const trips = useMemo(
    () => generateTrips({ from, to, date }),
    [from, to, date],
  );

  const filtered = useMemo(() => {
    let list = trips;
    if (operatorFilter !== "all")
      list = list.filter((t) => t.operator === operatorFilter);
    if (timeFilter !== "all") {
      list = list.filter((t) => {
        const hour = parseInt(t.departureTime.split(":")[0], 10);
        const isPM = t.departureTime.toLowerCase().includes("pm");
        const h24 = (hour % 12) + (isPM ? 12 : 0);
        if (timeFilter === "morning") return h24 >= 6 && h24 < 12;
        if (timeFilter === "afternoon") return h24 >= 12 && h24 < 17;
        if (timeFilter === "evening") return h24 >= 17 && h24 < 21;
        if (timeFilter === "night") return h24 >= 21 || h24 < 6;
        return true;
      });
    }
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "time-asc")
      list = [...list].sort((a, b) =>
        a.departureTime.localeCompare(b.departureTime),
      );
    return list;
  }, [trips, operatorFilter, timeFilter, sort]);

  const selectTrip = (t) => {
    try {
      localStorage.setItem(
        "selectedTrip",
        JSON.stringify({
          operator: t.operator,
          route: `${t.from} - ${t.to}`,
          departureTime: t.departureTime,
          date: t.date,
          passengers,
          price: t.price,
          coach: t.coach,
          boardingPoint: t.from,
          droppingPoint: t.to,
          estHours: t.durationHrs,
        }),
      );
    } catch {}
    router.push(`/#booking`);
  };

  return (
    <main className="px-6 max-w-7xl mx-auto w-full flex-1">
      {/* Compact search bar */}
      <div className="mt-8">
        <LocationSearch compact initial={{ from, to, date, passengers }} />
      </div>
      {/* Filters */}
      <div className="mt-6 bg-white border rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={operatorFilter}
            onChange={(e) => setOperatorFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All operators</option>
            {OPERATORS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">Any time</option>
            <option value="morning">Morning (6-12)</option>
            <option value="afternoon">Afternoon (12-17)</option>
            <option value="evening">Evening (17-21)</option>
            <option value="night">Night (21-6)</option>
          </select>
        </div>
        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="time-asc">Departure Time</option>
          </select>
        </div>
      </div>
      {/* Trip list */}
      <div className="mt-8 grid gap-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No trips found.</div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="border rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => selectTrip(t)}
            >
              <div className="flex-1 flex flex-col md:flex-row gap-4 items-center">
                <div className="font-semibold text-lg">{t.operator}</div>
                <div className="text-gray-500">{t.coach}</div>
                <div className="text-gray-500">{t.departureTime}</div>
                <div className="text-gray-500">{t.durationHrs} hrs</div>
                <div className="text-gray-500">Seats left: {t.seatsLeft}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-bold text-xl">৳{t.price}</div>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Book
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
