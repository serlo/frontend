export function scrollToPrevious(elem: HTMLElement | null) {
  if (elem === null) return
  const prev = elem.previousSibling as HTMLElement
  if (prev) prev.scrollIntoView()
}

export function scrollIfNeeded(elem: HTMLElement | null, center?: boolean) {
  if (elem === null) return
  try {
    // @ts-expect-error experimental feature https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    elem.scrollIntoViewIfNeeded(center)
  } catch {
    if (center) scrollToPrevious(elem)
    else elem.scrollIntoView()
  }
}
