import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useTransactionStore } from '../../store/useTransactionStore'
import { useFormatter } from '../../hooks/useFormatter'

export default function SummaryBar() {
  const getTotalExpense = useTransactionStore((s) => s.getTotalExpense)
  const getTotalIncome = useTransactionStore((s) => s.getTotalIncome)
  const getTotalBalance = useTransactionStore((s) => s.getTotalBalance)
  const { formatRp } = useFormatter()

  const expense = getTotalExpense()
  const income = getTotalIncome()
  const balance = getTotalBalance()

  return (
    <div
      id="summary-bar"
      className="flex items-center bg-white border-b border-gray-200 px-8 py-3"
    >
      {/* EXPENSE */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          EXPENSE
        </span>
        <ArrowUpRight size={14} className="text-red-500" />
        <span className="font-mono font-bold text-red-500 text-sm">
          {formatRp(expense)}
        </span>
      </div>

      {/* INCOME */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          INCOME
        </span>
        <ArrowDownLeft size={14} className="text-green-500" />
        <span className="font-mono font-bold text-green-500 text-sm">
          {formatRp(income)}
        </span>
      </div>

      {/* TOTAL */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          TOTAL
        </span>
        <span
          className={`font-mono font-bold text-sm ${
            balance >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {formatRp(Math.abs(balance))}
        </span>
      </div>
    </div>
  )
}
