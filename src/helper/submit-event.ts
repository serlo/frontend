import { NodePath } from '@/schema/article-renderer'

export function submitEvent(name: string, callback?: () => void) {
  try {
    const window_local: any = window
    if (window_local.sa_event) {
      //console.log('event', name)
      window_local.sa_event(name, callback)
      return true
    }
  } catch (e) {
    // ignore failures
  }
  return false
}

export function submitEventWithPath(action: string, path?: NodePath) {
  if (!path || path.length == 0) return // no path given -> not interesting
  submitEvent(`${action}_${path.map((x) => x.toString()).join('_')}`)
}
