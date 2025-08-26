export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-black">P-Ticket</div>

      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-600 hover:text-black transition-colors">
          Home
        </a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors">
          About
        </a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors">
          Destination
        </a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors">
          Search
        </a>
      </nav>

      <button className="bg-green-100 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-200 transition-colors">
        <span>Bus</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6z" />
        </svg>
      </button>
    </header>
  )
}

