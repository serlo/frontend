import { isClient } from './client-detection'

export function removeHash() {
  if (!isClient) return
  history.replaceState(
    null,
    document.title,
    window.location.pathname + window.location.search
  )
}
