export default function OffersSection() {
  return (
    <section className="mb-16 mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">Best offers for you</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
        {/* 15% OFF Coupon */}
        <div className="relative">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 relative overflow-hidden">
            {/* Perforated edges */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full -translate-x-3"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full translate-x-3"></div>

            {/* Dashed line */}
            <div className="absolute right-8 top-0 bottom-0 border-r-2 border-dashed border-yellow-600 opacity-30"></div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-4xl font-bold text-black mb-2">15% OFF</div>
                <div className="text-black text-lg mb-1">on your next purchase</div>
                <div className="text-black/70 text-sm">use by January 2024</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black mb-1">NEW15</div>
                <div className="text-black/70 text-sm">Coupon Code</div>
              </div>
            </div>
          </div>
        </div>

        {/* 20% OFF Coupon */}
        <div className="relative">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl p-8 relative overflow-hidden">
            {/* Perforated edges */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full -translate-x-3"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full translate-x-3"></div>

            {/* Dashed line */}
            <div className="absolute right-8 top-0 bottom-0 border-r-2 border-dashed border-pink-600 opacity-30"></div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-4xl font-bold text-black mb-2">20% OFF</div>
                <div className="text-black text-lg mb-1">on your next purchase</div>
                <div className="text-black/70 text-sm">use by January 2024</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black mb-1">Couple 20</div>
                <div className="text-black/70 text-sm">Coupon Code</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* See All Offers Button */}
      <div className="text-center">
        <button className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
          See All Offers
        </button>
      </div>
    </section>
  )
}

