export interface Transaction {
  id: number
  date: string
  account: string
  category: string
  note: string
  amount: number
  type: 'income' | 'expense'
}

export const ACCOUNTS = ['BCA', 'JAGO'] as const

export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Gift',
  'Health',
  'Entertainment',
  'Utilities',
  'Other',
] as const

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    date: '2026-05-10',
    account: 'BCA',
    category: 'Gift',
    note: 'Dari Robin',
    amount: 500000,
    type: 'income',
  },
  {
    id: 2,
    date: '2026-05-10',
    account: 'BCA',
    category: 'Food',
    note: 'Makan siang',
    amount: 35000,
    type: 'expense',
  },
  {
    id: 3,
    date: '2026-05-10',
    account: 'JAGO',
    category: 'Transport',
    note: 'Grab ke kantor',
    amount: 25000,
    type: 'expense',
  },
  {
    id: 4,
    date: '2026-05-09',
    account: 'BCA',
    category: 'Shopping',
    note: 'Beli baju',
    amount: 200000,
    type: 'expense',
  },
  {
    id: 5,
    date: '2026-05-09',
    account: 'JAGO',
    category: 'Gift',
    note: 'Dari Robin',
    amount: 500000,
    type: 'income',
  },
  {
    id: 6,
    date: '2026-05-08',
    account: 'BCA',
    category: 'Health',
    note: 'Vitamin',
    amount: 150000,
    type: 'expense',
  },
  {
    id: 7,
    date: '2026-05-08',
    account: 'JAGO',
    category: 'Entertainment',
    note: 'Netflix',
    amount: 54000,
    type: 'expense',
  },
  {
    id: 8,
    date: '2026-05-08',
    account: 'BCA',
    category: 'Utilities',
    note: 'Listrik',
    amount: 350000,
    type: 'expense',
  },
  {
    id: 9,
    date: '2026-05-07',
    account: 'BCA',
    category: 'Food',
    note: 'Kopi susu',
    amount: 28000,
    type: 'expense',
  },
  {
    id: 10,
    date: '2026-05-07',
    account: 'JAGO',
    category: 'Gift',
    note: 'Dari Robin',
    amount: 250000,
    type: 'income',
  },
]
