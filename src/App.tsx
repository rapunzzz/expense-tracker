import { useTransactionStore } from './store/useTransactionStore'
import AppNav from './components/layout/AppNav'
import EntryToolbar from './components/entry/EntryToolbar'
import EntryRow from './components/entry/EntryRow'
import SummaryBar from './components/summary/SummaryBar'
import TransactionList from './components/transactions/TransactionList'

export default function App() {
  const activeCell = useTransactionStore((s) => s.activeCell)
  const closeAll = useTransactionStore((s) => s.closeAll)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/* Navbar: full-width */}
      <AppNav />

      {/* Main content: constrained width, centered */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col flex-1">
        <EntryToolbar />
        <EntryRow />
        <SummaryBar />
        <TransactionList />
      </div>

      {/* Full-screen overlay to close dropdowns on outside click */}
      {activeCell && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
