export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
          {/* Left Side - Brand Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">P-Ticket</h3>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              P-Ticket is a digital platform to make your daily commuting better.
            </p>
          </div>

          {/* Right Side - App Download */}
          <div className="flex-shrink-0">
            <h4 className="text-xl font-semibold mb-4">Download our app</h4>
            <a
              href="#"
              className="inline-flex items-center bg-black hover:bg-gray-800 transition-colors rounded-lg px-4 py-3 border border-gray-600"
            >
              <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-300">GET IT ON</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">©all rights reserved, P-Ticket services limited.2024</div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms & condition
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Return & refund policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

