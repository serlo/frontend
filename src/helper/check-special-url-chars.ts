export function hasSpecialUrlChars(url: string) {
  const decoded = decodeURIComponent(url)
  return (
    decoded.includes('%') ||
    decoded.includes('?') ||
    decoded.includes('&') ||
    decoded.includes('+')
  )
}
