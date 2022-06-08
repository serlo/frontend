export function submitEvent(name: string, callback?: () => void) {
  try {
    const window_local = window as typeof window & {
      sa_event?: (arg1: string, arg2?: unknown) => void
    }
    if (window_local.sa_event) {
      // console.log('event', name)
      window_local.sa_event(name, callback)
      //@ts-expect-error unknown
      if (window_local.sa_event.q) {
        return false
      }
      return true
    }
  } catch (e) {
    // ignore failures
  }
  return false
}
