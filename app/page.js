import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroWithStats from "../components/HeroWithStats"
import OffersSection from "../components/OffersSection"
import BusDetailsCard from "../components/BusDetailsCard"
import SeatSelection from "../components/SeatSelection"
import BookingForm from "../components/BookingForm"

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

        {/* Booking Section */}
        <section className="mb-16">
          {/* Bus Company Header */}
          <div className="bg-white rounded-2xl border-2 border-green-200 p-6 mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-black mb-2">P.H Paribahan</h1>
              <p className="text-gray-600">
                Yes, you can run unit tests and view the results directly within the app. The integrated testing features
                allow for a streamlined
              </p>
            </div>

            {/* Bus Details Card */}
            <BusDetailsCard />
          </div>

          {/* Seat Selection and Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seat Selection */}
            <SeatSelection />

            {/* Booking Form */}
            <BookingForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
