const eventName = 'unsupportedPluginType'

const event = new Event(eventName)

export function emitUnsupportedPluginsEvent() {
  document.dispatchEvent(event)
}

export function listenForUnsupportedPlugins(callback: () => void) {
  document.addEventListener(eventName, callback, { capture: true, once: true })
}

export function removeUnsupportedPluginsListener(callback: () => void) {
  document.removeEventListener(eventName, callback, true)
}
