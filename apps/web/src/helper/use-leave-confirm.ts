import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useCallback, useEffect } from 'react'

import { useInstanceData } from '@/contexts/instance-context'

// we use this hash to make sure we don't block redirects after an successful save
export const successHash = '#success'

// needed because of https://github.com/vercel/next.js/issues/2476
export function useLeaveConfirm(protect: boolean) {
  const router = useRouter()
  const strings = useInstanceData().strings.saveButton

  const onRouteChangeStart = useCallback(
    (targetUrl?: string) => {
      if (targetUrl && targetUrl.includes(successHash)) return
      if (protect) {
        if (window.confirm(strings.confirmRouteChange)) {
          return true
        }
        nProgress.done()
        if (router.asPath !== window.location.pathname) {
          window.history.pushState('', '', router.asPath)
        }
        throw new Error("Abort route change by user's confirmation.")
      }
    },
    [protect, strings.confirmRouteChange, router.asPath]
  )

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)
    window.onbeforeunload = protect ? () => true : null

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      window.onbeforeunload = null
    }
  }, [onRouteChangeStart, router.events, protect])

  return
}
