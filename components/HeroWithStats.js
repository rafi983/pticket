import StatsCard from "./StatsCard";
import LocationSearch from "./LocationSearch";

export default function HeroWithStats() {
  return (
    <div className="relative bg-gradient-to-r from-slate-800 to-blue-900 rounded-3xl overflow-visible min-h-[600px] flex items-center mb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-3xl"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%203.jpg-Yd2g7sGLrFjAAe3bil0VXMkYmR1LDf.jpeg')",
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          End-to-End Travel with
          <br />
          <span className="text-green-400">P Paribahan</span>
        </h1>

        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Yes, you can run unit tests and view the results directly within the
          app. The integrated testing features allow for a streamlined
        </p>

        <div className="max-w-5xl mx-auto">
          <LocationSearch />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="absolute -bottom-16 left-0 right-0 z-30 px-8">
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-6xl mx-auto">
          <StatsCard number="500K+" label="Registered users" variant="users" />
          <StatsCard
            number="1.7 lachs"
            label="Tickets sold"
            variant="tickets"
          />
          <StatsCard number="80K+" label="Rental partners" variant="bus" />
        </div>
      </div>
    </div>
  );
}
