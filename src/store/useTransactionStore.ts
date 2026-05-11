import { create } from 'zustand'
import {
  type Transaction,
  SEED_TRANSACTIONS,
  ACCOUNTS,
  CATEGORIES,
} from '../data/transactions'

type FilterTab = 'date' | 'category' | 'account'

interface TransactionForm {
  date: string
  account: string
  category: string
  note: string
  amount: string
}

interface TransactionState {
  transactions: Transaction[]
  form: TransactionForm
  activeCell: string | null
  accountSearch: string
  categorySearch: string
  filterTab: FilterTab
  searchQuery: string

  // Actions
  activateCell: (cell: string | null) => void
  selectAccount: (item: string) => void
  selectCategory: (item: string) => void
  updateForm: (field: keyof TransactionForm, value: string) => void
  submitTransaction: () => void
  closeAll: () => void
  setFilterTab: (tab: FilterTab) => void
  setSearchQuery: (query: string) => void

  // Derived
  getFilteredAccounts: () => string[]
  getFilteredCategories: () => string[]
  getTotalExpense: () => number
  getTotalIncome: () => number
  getTotalBalance: () => number
  getGroupedTransactions: () => Record<string, Transaction[]>
}

function getTodayFormatted(): string {
  const now = new Date()
  const day = now.getDate()
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  return `${day} ${month} ${year}`
}

function parseDateInput(input: string): string | null {
  // Try to parse "DD MMM YYYY" format back to "YYYY-MM-DD"
  const months: Record<string, string> = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
  }
  const parts = input.trim().split(/\s+/)
  if (parts.length !== 3) return null
  const day = parts[0].padStart(2, '0')
  const month = months[parts[1].toLowerCase()]
  const year = parts[2]
  if (!month || !year) return null
  return `${year}-${month}-${day}`
}

function formatDateForDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
}

function getDateLabel(dateStr: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setHours(0, 0, 0, 0)

  if (date.getTime() === today.getTime()) return 'TODAY'
  if (date.getTime() === yesterday.getTime()) return 'YESTERDAY'
  return formatDateForDisplay(dateStr).toUpperCase()
}

const initialForm: TransactionForm = {
  date: getTodayFormatted(),
  account: '',
  category: '',
  note: '',
  amount: '',
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [...SEED_TRANSACTIONS],
  form: { ...initialForm },
  activeCell: null,
  accountSearch: '',
  categorySearch: '',
  filterTab: 'date',
  searchQuery: '',

  activateCell: (cell) =>
    set({
      activeCell: cell,
      accountSearch: '',
      categorySearch: '',
    }),

  selectAccount: (item) =>
    set({
      form: { ...get().form, account: item },
      activeCell: 'category',
      accountSearch: '',
    }),

  selectCategory: (item) =>
    set({
      form: { ...get().form, category: item },
      activeCell: 'note',
      categorySearch: '',
    }),

  updateForm: (field, value) =>
    set({ form: { ...get().form, [field]: value } }),

  submitTransaction: () => {
    const { form, transactions } = get()
    const parsedDate = parseDateInput(form.date)
    if (!parsedDate || !form.account || !form.category || !form.amount) return

    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) return

    const newTransaction: Transaction = {
      id: transactions.length > 0
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1,
      date: parsedDate,
      account: form.account,
      category: form.category,
      note: form.note || '',
      amount,
      type: 'expense',
    }

    set({
      transactions: [newTransaction, ...transactions],
      form: { ...initialForm },
      activeCell: null,
    })
  },

  closeAll: () =>
    set({
      activeCell: null,
      accountSearch: '',
      categorySearch: '',
    }),

  setFilterTab: (tab) => set({ filterTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredAccounts: () => {
    const { accountSearch } = get()
    const search = accountSearch.toLowerCase()
    return ACCOUNTS.filter((a) => a.toLowerCase().includes(search))
  },

  getFilteredCategories: () => {
    const { categorySearch } = get()
    const search = categorySearch.toLowerCase()
    return CATEGORIES.filter((c) => c.toLowerCase().includes(search))
  },

  getTotalExpense: () =>
    get()
      .transactions.filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),

  getTotalIncome: () =>
    get()
      .transactions.filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),

  getTotalBalance: () => get().getTotalIncome() - get().getTotalExpense(),

  getGroupedTransactions: () => {
    const { transactions, filterTab, searchQuery } = get()

    let filtered = transactions
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = transactions.filter(
        (t) =>
          t.note.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.account.toLowerCase().includes(q) ||
          t.amount.toString().includes(q)
      )
    }

    // Sort by date descending
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const groups: Record<string, Transaction[]> = {}

    for (const t of sorted) {
      let key: string
      if (filterTab === 'date') {
        key = getDateLabel(t.date)
      } else if (filterTab === 'category') {
        key = t.category.toUpperCase()
      } else if (filterTab === 'account') {
        key = t.account.toUpperCase()
      } else {
        key = getDateLabel(t.date)
      }
      if (!groups[key]) groups[key] = []
      groups[key].push(t)
    }

    return groups
  },
}))
