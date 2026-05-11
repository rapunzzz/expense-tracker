import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Transaction } from '../../data/transactions'
import { useFormatter } from '../../hooks/useFormatter'
import TransactionTag from './TransactionTag'

interface TransactionItemProps {
  transaction: Transaction
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { formatRp } = useFormatter()
  const isExpense = transaction.type === 'expense'

  return (
    <div className="flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 transition-colors">
      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isExpense ? 'bg-red-50' : 'bg-green-50'
        }`}
      >
        {isExpense ? (
          <ArrowUpRight size={16} className="text-red-500" />
        ) : (
          <ArrowDownRight size={16} className="text-green-500" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <TransactionTag label={transaction.account} variant="account" />
          <TransactionTag label={transaction.category} variant="category" />
        </div>
        <div className="text-sm text-gray-600 truncate">
          {transaction.note}
        </div>
      </div>

      {/* Amount */}
      <div
        className={`text-sm font-mono font-bold flex-shrink-0 ${
          isExpense ? 'text-gray-900' : 'text-green-500'
        }`}
      >
        {isExpense ? '' : '+'}
        {formatRp(transaction.amount)}
      </div>
    </div>
  )
}
