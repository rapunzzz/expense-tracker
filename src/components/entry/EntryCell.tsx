import { useRef, useEffect } from 'react'

interface EntryCellProps {
  label: string
  value: string
  isActive: boolean
  placeholder?: string
  type?: 'text' | 'number'
  onActivate: () => void
  onChange: (value: string) => void
  onTab?: () => void
  onEnter?: () => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export default function EntryCell({
  label,
  value,
  isActive,
  placeholder = '-',
  type = 'text',
  onActivate,
  onChange,
  onTab,
  onEnter,
  inputRef: externalRef,
}: EntryCellProps) {
  const internalRef = useRef<HTMLInputElement>(null)
  const ref = externalRef || internalRef

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.focus()
    }
  }, [isActive, ref])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault()
      onTab?.()
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter?.()
    }
  }

  return (
    <div
      className={`flex-1 min-w-0 px-4 py-2 cursor-pointer border-b-2 transition-colors ${
        isActive ? 'border-gray-900' : 'border-transparent'
      }`}
      onClick={onActivate}
    >
      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </div>

      {isActive ? (
        <input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-sm font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-300 font-mono"
        />
      ) : (
        <div className="text-sm font-medium text-gray-400 font-mono truncate">
          {value || placeholder}
        </div>
      )}
    </div>
  )
}
