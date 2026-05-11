export default function EntryToolbar() {
  return (
    <div
      id="entry-toolbar"
      className="flex items-center gap-1 px-8 py-2 bg-gray-50 border-b border-gray-200 text-xs font-mono text-gray-400"
    >
      <span className="text-red-500 font-semibold border border-red-200 rounded px-2 py-0.5 bg-red-50">
        Expense
      </span>
      <span className="mx-1 text-gray-300">|</span>
      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-[10px]">
        Tab
      </kbd>
      <span>Next</span>

      <kbd className="ml-2 px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-[10px]">
        Enter
      </kbd>
      <span>Submit</span>

      <span className="mx-1 text-gray-300">|</span>

      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-[10px]">
        ⌘←
      </kbd>
      <span>Back</span>

      <kbd className="ml-2 px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-[10px]">
        ⌘→
      </kbd>
      <span>Fwd</span>

      <span className="mx-1 text-gray-300">|</span>

      <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-[10px]">
        T
      </kbd>
      <span>Today</span>

      <kbd className="ml-2 px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-500 font-mono text-[10px]">
        Y
      </kbd>
      <span>Yesterday</span>
    </div>
  )
}
