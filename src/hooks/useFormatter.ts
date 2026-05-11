export function useFormatter() {
  function formatRp(amount: number): string {
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    return `Rp${formatted}`
  }

  return { formatRp }
}
