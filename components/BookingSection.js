"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SeatSelection from "./SeatSelection";
import BookingForm from "./BookingForm";
import BusDetailsCard from "./BusDetailsCard";

const DEFAULT_PRICE = 550;
const MAX_SELECTION = 4;
const HOLD_DURATION_MS = 10 * 60 * 1000; // 10 minutes

// Simple coupon rules for demo
const COUPONS = {
  NEW15: { code: "NEW15", type: "percent", value: 0.15, minSeats: 1 },
  COUPLE20: { code: "COUPLE20", type: "percent", value: 0.2, minSeats: 2 },
};

export default function BookingSection() {
  const router = useRouter();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [pricePerSeat, setPricePerSeat] = useState(DEFAULT_PRICE);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  // Simulate taken seats
  const disabledSeats = useMemo(() => new Set(["D3", "E1", "G2"]), []);

  // Load selected trip
  useEffect(() => {
    try {
      const raw = localStorage.getItem("selectedTrip");
      if (raw) {
        const parsed = JSON.parse(raw);
        setSelectedTrip(parsed);
        if (parsed.price) setPricePerSeat(parsed.price);
        else setPricePerSeat(DEFAULT_PRICE);
      } else {
        setSelectedTrip(null);
        setPricePerSeat(DEFAULT_PRICE);
      }
    } catch {
      setSelectedTrip(null);
      setPricePerSeat(DEFAULT_PRICE);
    }
  }, []);

  const toggleSeat = (seat) => {
    if (disabledSeats.has(seat)) return;
    setSelectedSeats((prev) => {
      const exists = prev.includes(seat);
      if (exists) return prev.filter((s) => s !== seat);
      if (prev.length >= MAX_SELECTION) return prev; // enforce limit
      return [...prev, seat];
    });
  };

  const subtotal = selectedSeats.length * pricePerSeat;

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const rules = COUPONS[appliedCoupon.code];
    if (!rules) return 0;
    if (selectedSeats.length < (rules.minSeats || 0)) return 0;
    if (rules.type === "percent") return Math.round(subtotal * rules.value);
    return 0;
  }, [appliedCoupon, selectedSeats.length, subtotal]);

  const grandTotal = Math.max(0, subtotal - discount);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const found = COUPONS[code];
    if (!found) {
      setAppliedCoupon({ code, invalid: true });
      return;
    }
    setAppliedCoupon(found);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
  };

  const proceedToCheckout = (passenger) => {
    const now = Date.now();
    const holdExpiresAt = now + HOLD_DURATION_MS;
    const operator = selectedTrip?.operator || "P.H Paribahan";
    const route = selectedTrip?.route || "Dhaka - Sylhet";
    const departureTime = selectedTrip?.departureTime || "9:00 PM";
    const boardingPoint = selectedTrip?.boardingPoint || (selectedTrip?.route?.split(" - ")?.[0] || "Boarding");
    const droppingPoint = selectedTrip?.droppingPoint || (selectedTrip?.route?.split(" - ")?.[1] || "Dropping");
    const estHours = selectedTrip?.estHours || 11;

    const booking = {
      id: `TMP-${now}`,
      operator,
      route,
      departureTime,
      date: selectedTrip?.date || null,
      selectedSeats,
      pricePerSeat,
      subtotal,
      discount,
      grandTotal,
      coupon: appliedCoupon?.code || null,
      passenger,
      boardingPoint,
      droppingPoint,
      estHours,
      holdExpiresAt,
      createdAt: now,
    };
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("pendingBooking", JSON.stringify(booking));
      }
    } catch {}
    router.push("/checkout");
  };

  const operator = selectedTrip?.operator || "P.H Paribahan";
  const route = selectedTrip?.route || "Dhaka - Sylhet";
  const departureTime = selectedTrip?.departureTime || "9:00 PM";
  const date = selectedTrip?.date;
  const boardingPoint = selectedTrip?.boardingPoint || (route.split(" - ")?.[0] || "Boarding");
  const droppingPoint = selectedTrip?.droppingPoint || (route.split(" - ")?.[1] || "Dropping");
  const estHours = selectedTrip?.estHours || 11;

  return (
    <section id="booking" className="mb-16">
      {/* Bus Company Header */}
      <div className="bg-white rounded-2xl border-2 border-green-200 p-6 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-2">{operator}</h1>
          <p className="text-gray-600">
            {route} {date ? `• ${date}` : ""}
          </p>
        </div>
        <BusDetailsCard
          operator={operator}
          route={route}
          departureTime={departureTime}
          pricePerSeat={pricePerSeat}
          boardingPoint={boardingPoint}
          droppingPoint={droppingPoint}
          estHours={estHours}
        />
      </div>

      {/* Seat Selection and Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SeatSelection
          selectedSeats={selectedSeats}
          onToggleSeat={toggleSeat}
          disabledSeats={disabledSeats}
        />

        <BookingForm
          selectedSeats={selectedSeats}
          pricePerSeat={pricePerSeat}
          subtotal={subtotal}
          discount={discount}
          grandTotal={grandTotal}
          couponInput={couponInput}
          setCouponInput={setCouponInput}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={applyCoupon}
          onRemoveCoupon={removeCoupon}
          maxSelection={MAX_SELECTION}
          onProceed={proceedToCheckout}
        />
      </div>
    </section>
  );
}
