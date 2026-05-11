interface TransactionTagProps {
  label: string
  variant: 'account' | 'category'
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  // Accounts
  BCA: { bg: 'bg-tag-bca', text: 'text-tag-bca-text' },
  JAGO: { bg: 'bg-tag-jago', text: 'text-tag-jago-text' },
  // Categories
  Food: { bg: 'bg-tag-food', text: 'text-tag-food-text' },
  Transport: { bg: 'bg-tag-transport', text: 'text-tag-transport-text' },
  Shopping: { bg: 'bg-tag-shopping', text: 'text-tag-shopping-text' },
  Gift: { bg: 'bg-tag-gift', text: 'text-tag-gift-text' },
  Health: { bg: 'bg-tag-health', text: 'text-tag-health-text' },
  Entertainment: {
    bg: 'bg-tag-entertainment',
    text: 'text-tag-entertainment-text',
  },
  Utilities: { bg: 'bg-tag-utilities', text: 'text-tag-utilities-text' },
  Other: { bg: 'bg-tag-other', text: 'text-tag-other-text' },
}

export default function TransactionTag({ label }: TransactionTagProps) {
  const colors = TAG_COLORS[label] || TAG_COLORS.Other

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${colors.bg} ${colors.text}`}
    >
      {label}
    </span>
  )
}
