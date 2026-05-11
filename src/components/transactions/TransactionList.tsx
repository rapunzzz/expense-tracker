import { Search } from 'lucide-react'
import { useTransactionStore } from '../../store/useTransactionStore'
import TransactionGroup from './TransactionGroup'

export default function TransactionList() {
  const filterTab = useTransactionStore((s) => s.filterTab)
  const searchQuery = useTransactionStore((s) => s.searchQuery)
  const setFilterTab = useTransactionStore((s) => s.setFilterTab)
  const setSearchQuery = useTransactionStore((s) => s.setSearchQuery)
  const getGroupedTransactions = useTransactionStore(
    (s) => s.getGroupedTransactions
  )

  const groups = getGroupedTransactions()
  const groupEntries = Object.entries(groups)

  const tabs = [
    { key: 'date' as const, label: 'By Date' },
    { key: 'category' as const, label: 'By Category' },
    { key: 'account' as const, label: 'By Account' }
  ]

  return (
    <div id="transaction-list" className="flex-1 flex flex-col bg-white">
      {/* Control bar */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-gray-200">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filterTab === tab.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            id="search-transaction"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transaction"
            className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-gray-400 transition-colors w-48 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Transaction groups */}
      <div className="flex-1 overflow-y-auto">
        {groupEntries.length > 0 ? (
          groupEntries.map(([label, transactions]) => (
            <TransactionGroup
              key={label}
              label={label}
              transactions={transactions}
            />
          ))
        ) : (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">
            No transactions found
          </div>
        )}
      </div>
    </div>
  )
}
