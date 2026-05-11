import { User } from 'lucide-react'

export default function AppNav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <h1 className="text-xl font-bold font-mono tracking-tight text-gray-900">
        Expense Tracker
      </h1>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <button
            id="nav-transaction"
            className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-gray-100 rounded-md transition-colors"
          >
            Transaction
          </button>
          <button
            id="nav-accounts"
            className="px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Accounts
          </button>
          <button
            id="nav-settings"
            className="px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Settings
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={14} className="text-gray-400" />
          </div>
          <span className="font-medium text-gray-700">My Name</span>
        </div>
      </div>
    </nav>
  )
}
