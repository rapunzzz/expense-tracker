import type { Transaction } from '../../data/transactions'
import { useFormatter } from '../../hooks/useFormatter'
import TransactionItem from './TransactionItem'

interface TransactionGroupProps {
  label: string
  transactions: Transaction[]
}

export default function TransactionGroup({
  label,
  transactions,
}: TransactionGroupProps) {
  const { formatRp } = useFormatter()

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const net = income - expense

  return (
    <div className="mb-0">
      {/* Group header */}
      <div className="flex items-center justify-between px-8 py-2 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`text-xs font-mono font-bold ${
            net >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {net >= 0 ? '+' : '-'}
          {formatRp(Math.abs(net))}
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  )
}
