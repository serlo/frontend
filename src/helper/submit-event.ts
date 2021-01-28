import { NodePath } from '@/schema/article-renderer'

export function submitEvent(name: string) {
  console.log('event', name)
  try {
    const window_local: any = window
    if (window_local.sa_event) {
      window_local.sa_event(name)
    }
  } catch (e) {
    // ignore failures
  }
}

export function submitEventWithPath(action: string, path?: NodePath) {
  if (!path || path.length == 0) return // no path given -> not interesting
  submitEvent(`${action}_${path.map((x) => x.toString()).join('_')}`)
}
