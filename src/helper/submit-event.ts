export function submitEvent(name: string) {
  const window_local: any = window
  if (window_local.sa_event) {
    window_local.sa_event(name)
  }
}
