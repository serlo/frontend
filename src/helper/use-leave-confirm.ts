import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import * as React from 'react'

import { useLoggedInData } from '@/contexts/logged-in-data-context'

// needed because of https://github.com/vercel/next.js/issues/2476
export function useLeaveConfirm(dirty: boolean) {
  const Router = useRouter()
  const loggedInData = useLoggedInData()

  const onRouteChangeStart = React.useCallback(() => {
    if (dirty) {
      if (window.confirm(loggedInData?.strings.editor.confirmRouteChange)) {
        return true
      }
      nProgress.done()
      if (Router.asPath !== window.location.pathname) {
        window.history.pushState('', '', Router.asPath)
      }
      throw "Abort route change by user's confirmation."
    }
  }, [dirty, loggedInData?.strings.editor.confirmRouteChange, Router.asPath])

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    window.onbeforeunload = dirty ? () => true : null

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      window.onbeforeunload = null
    }
  }, [onRouteChangeStart, Router.events, dirty])

  return
}
