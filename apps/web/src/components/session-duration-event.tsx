import { useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { submitEvent } from '@/helper/submit-event'

const key = 'serlo_frontend_session_duration_event'

export function SessionDurationEvent() {
  const auth = useAuthentication()

  function trigger() {
    if (typeof window !== 'undefined') {
      try {
        const obj = getStateFromSession()
        if (auth && obj.state !== 'logged-in') {
          sessionStorage.setItem(
            key,
            JSON.stringify({ state: 'logged-in', ts: -1 })
          )
        } else if (auth) {
          // do nothing
        } else if (obj.state === 'unvisited') {
          sessionStorage.setItem(
            key,
            JSON.stringify({ state: 'visited', ts: new Date().getTime() })
          )
        } else if (obj.state === 'visited') {
          const passed = new Date().getTime() - obj.ts
          if (passed >= 1000 * 60 * 5) {
            submitEvent('session_duration_5_minutes')
            sessionStorage.setItem(
              key,
              JSON.stringify({ state: 'send', ts: -1 })
            )
          }
        }
      } catch (e) {
        // ignore failures
      }
    }
  }

  trigger()

  useEffect(() => {
    const onScroll = () => {
      trigger()
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return null
}

interface SessionState {
  state: 'unvisited' | 'visited' | 'logged-in' | 'send'
  ts: number
}

function getStateFromSession(): SessionState {
  try {
    const rawState = sessionStorage.getItem(key)

    if (rawState) {
      const obj = JSON.parse(rawState) as SessionState

      if (typeof obj === 'object' && 'state' in obj && 'ts' in obj) {
        console.log(obj)
        return obj
      }
    }
  } catch (e) {
    // ignore parse error
  }
  sessionStorage.removeItem(key)
  return { state: 'unvisited', ts: -1 }
}
