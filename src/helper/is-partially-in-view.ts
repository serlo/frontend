// adapted from https://stackoverflow.com/a/26039199/3294973
export function isPartiallyInView(el: HTMLElement, buffer?: number) {
  if (typeof window === undefined) return false
  const rect = el.getBoundingClientRect()
  return (
    rect.top + (buffer ?? 0) <= window.innerHeight &&
    rect.top + rect.height >= 0
  )
}
