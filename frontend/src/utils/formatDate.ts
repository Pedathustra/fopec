export function formatDate(timestamp: number | string): string {
    const date = new Date(Number(timestamp))
    if (isNaN(date.getTime())) return 'Invalid Date'
  
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
