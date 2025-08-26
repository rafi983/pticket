export default function StatsCard({ number, label, variant = "users" }) {
  const Icon = () => {
    if (variant === "tickets") {
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
        </svg>
      )
    }
    if (variant === "bus") {
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 11-3 0 3 3 0 013 0zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-4 lg:p-6 border-b-4 border-green-500 text-center shadow-xl flex flex-col justify-center min-w-[280px] w-full sm:w-auto sm:flex-1 lg:w-[308px] h-[138px]">
      <div className="flex justify-center mb-2">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Icon />
        </div>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-gray-600 text-sm font-medium">{label}</div>
    </div>
  )
}

