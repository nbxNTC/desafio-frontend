/**
 * Date formatting utilities
 */

/**
 * Format a UTC date string to BRT (Brazil Time - America/Sao_Paulo)
 * @param dateString - ISO 8601 date string in UTC
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @returns Formatted date string in BRT timezone
 */
export function formatDateToBRT(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Sao_Paulo',
    ...options
  }

  return date.toLocaleDateString('en-US', defaultOptions)
}
