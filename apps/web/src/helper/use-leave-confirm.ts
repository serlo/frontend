import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useCallback, useEffect } from 'react'

// we use this hash to make sure we don't block redirects after an successful save
export const successHash = '#success'

// needed because of https://github.com/vercel/next.js/issues/2476
export function useLeaveConfirm(protect: boolean) {
  const Router = useRouter()
  const editStrings = useEditStrings()

  const onRouteChangeStart = useCallback(
    (targetUrl?: string) => {
      if (targetUrl && targetUrl.includes(successHash)) return
      if (protect) {
        if (window.confirm(editStrings.confirmRouteChange)) {
          return true
        }
        nProgress.done()
        if (Router.asPath !== window.location.pathname) {
          window.history.pushState('', '', Router.asPath)
        }
        throw "Abort route change by user's confirmation."
      }
    },
    [protect, editStrings.confirmRouteChange, Router.asPath]
  )

  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    window.onbeforeunload = protect ? () => true : null

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      window.onbeforeunload = null
    }
  }, [onRouteChangeStart, Router.events, protect])

  return
}
