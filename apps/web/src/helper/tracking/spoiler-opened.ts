import { v4 as uuidv4 } from 'uuid'

import { isProduction } from '../is-production'

export interface SpoilerEventData {}

const sesionStorageKey = '___serlo_spoiler_tracking___'

export function spoilerOpened(data: SpoilerEventData) {
  if (!sessionStorage.getItem(sesionStorageKey)) {
    // set new session id
    sessionStorage.setItem(sesionStorageKey, uuidv4())
  }
  const sessionId = sessionStorage.getItem(sesionStorageKey)

  void (async () => {
    await fetch('/api/frontend/spoiler-opened-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, sessionId, isProduction }),
    })
  })()
}
