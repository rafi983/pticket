import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroWithStats from "../components/HeroWithStats";
import OffersSection from "../components/OffersSection";
import BookingSection from "../components/BookingSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="px-6 max-w-7xl mx-auto">
        {/* Hero with Stats */}
        <HeroWithStats />

        {/* Offers */}
        <OffersSection />

        {/* Booking Section (interactive) */}
        <BookingSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
