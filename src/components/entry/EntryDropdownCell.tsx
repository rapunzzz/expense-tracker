import { useRef, useEffect } from 'react'

interface EntryDropdownCellProps {
  label: string
  value: string
  isActive: boolean
  searchValue: string
  options: string[]
  onActivate: () => void
  onSearchChange: (value: string) => void
  onSelect: (item: string) => void
}

export default function EntryDropdownCell({
  label,
  value,
  isActive,
  searchValue,
  options,
  onActivate,
  onSearchChange,
  onSelect,
}: EntryDropdownCellProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isActive])

  function handleKeyDown(e: React.KeyboardEvent) {
    // Allow number keys to quick-select
    const num = parseInt(e.key)
    if (!isNaN(num) && num >= 1 && num <= options.length) {
      e.preventDefault()
      onSelect(options[num - 1])
    }
  }

  return (
    <div className="relative flex-1 min-w-0">
      <div
        className={`px-4 py-2 cursor-pointer border-b-2 transition-colors ${
          isActive ? 'border-gray-900' : 'border-transparent'
        }`}
        onClick={onActivate}
      >
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </div>

        {isActive ? (
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            placeholder="Search to select"
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-sm font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-400 font-mono"
          />
        ) : (
          <div className="text-sm font-medium text-gray-400 font-mono truncate">
            {value || '-'}
          </div>
        )}
      </div>

      {isActive && (
        <div className="absolute top-full left-0 right-0 z-50 mt-0 bg-white border border-gray-200 rounded-b-lg shadow-lg overflow-hidden">
          {options.map((item, i) => (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="text-gray-400 font-mono text-xs">{i + 1}</span>
              <span className="font-medium text-gray-700">{item}</span>
            </button>
          ))}
          {options.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-400 italic">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  )
}
