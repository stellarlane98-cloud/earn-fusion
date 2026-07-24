/** Format a number as PKR currency, e.g. 24580 -> "Rs 24,580" */
export function formatPKR(amount: number, decimals = 0): string {
  return `Rs ${amount.toLocaleString('en-PK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

export const CURRENCY_PREFIX = 'Rs '
export const CURRENCY_CODE = 'PKR'
export const MIN_WITHDRAWAL = 1000
