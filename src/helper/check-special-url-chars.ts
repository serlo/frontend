export function hasSpecialUrlChars(url: string) {
  return (
    decodeURIComponent(url).includes('%') ||
    decodeURIComponent(url).includes('?') ||
    decodeURIComponent(url).includes('&')
  )
}
