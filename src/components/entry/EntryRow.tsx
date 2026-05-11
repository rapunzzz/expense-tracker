import { useTransactionStore } from '../../store/useTransactionStore'
import EntryCell from './EntryCell'
import EntryDropdownCell from './EntryDropdownCell'

export default function EntryRow() {
  const {
    form,
    activeCell,
    accountSearch,
    categorySearch,
    activateCell,
    updateForm,
    selectAccount,
    selectCategory,
    submitTransaction,
    getFilteredAccounts,
    getFilteredCategories,
  } = useTransactionStore()

  const cells = ['date', 'account', 'category', 'note', 'amount'] as const
  function advanceTo(field: string) {
    const idx = cells.indexOf(field as typeof cells[number])
    if (idx < cells.length - 1) {
      activateCell(cells[idx + 1])
    }
  }

  return (
    <div
      id="entry-row"
      className="flex bg-white border-b border-gray-200"
    >
      {/* DATE */}
      <EntryCell
        label="DATE"
        value={form.date}
        isActive={activeCell === 'date'}
        placeholder="DD MMM YYYY"
        onActivate={() => activateCell('date')}
        onChange={(v) => updateForm('date', v)}
        onTab={() => advanceTo('date')}
        onEnter={() => advanceTo('date')}
      />

      {/* ACCOUNT */}
      <EntryDropdownCell
        label="ACCOUNT"
        value={form.account}
        isActive={activeCell === 'account'}
        searchValue={accountSearch}
        options={getFilteredAccounts()}
        onActivate={() => activateCell('account')}
        onSearchChange={(v) =>
          useTransactionStore.setState({ accountSearch: v })
        }
        onSelect={selectAccount}
      />

      {/* CATEGORY */}
      <EntryDropdownCell
        label="CATEGORY"
        value={form.category}
        isActive={activeCell === 'category'}
        searchValue={categorySearch}
        options={getFilteredCategories()}
        onActivate={() => activateCell('category')}
        onSearchChange={(v) =>
          useTransactionStore.setState({ categorySearch: v })
        }
        onSelect={selectCategory}
      />

      {/* NOTE */}
      <EntryCell
        label="NOTE"
        value={form.note}
        isActive={activeCell === 'note'}
        placeholder="Add Notes"
        onActivate={() => activateCell('note')}
        onChange={(v) => updateForm('note', v)}
        onTab={() => advanceTo('note')}
        onEnter={() => advanceTo('note')}
      />

      {/* AMOUNT */}
      <EntryCell
        label="AMOUNT"
        value={form.amount}
        isActive={activeCell === 'amount'}
        placeholder="Add Amount"
        type="number"
        onActivate={() => activateCell('amount')}
        onChange={(v) => updateForm('amount', v)}
        onTab={() => submitTransaction()}
        onEnter={() => submitTransaction()}
      />
    </div>
  )
}
