import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'

import { FrontendClientBaseProps } from '@/components/frontend-client-base'
import { NProgressStyles } from '@/components/navigation/n-progress-styles'
import { ToastNotice } from '@/components/toast-notice'
import { FontFix } from '@/helper/css'
import { languages } from '@/helper/feature-i18n'
import { theme } from '@/theme'

config.autoAddCss = false

export interface SentryGlobal {
  Sentry?: {
    addBreadcrumb: (arg0: {
      type?: string
      category?: string
      message?: string
      level?: string
      timestamp?: string
      data?: unknown
    }) => void
    captureException: (arg0: Error) => void
    Severity?: {
      Info: string
    }
    init: (arg0: { environment: string; release: string }) => void
    forceLoad: () => void
  }
}

if (
  process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined &&
  process.env.NEXT_PUBLIC_COMMIT_SHA !== undefined &&
  typeof window !== 'undefined'
) {
  const windowWithSentry = (window as unknown) as Window & SentryGlobal
  windowWithSentry.Sentry?.init({
    environment: process.env.NEXT_PUBLIC_ENV,
    release: `frontend@${process.env.NEXT_PUBLIC_COMMIT_SHA?.substr(0, 7)}`,
  })
  windowWithSentry.Sentry?.forceLoad()
}

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const FrontendClientBase = dynamic<FrontendClientBaseProps>(() =>
  import('@/components/frontend-client-base').then(
    (mod) => mod.FrontendClientBase
  )
)

// a very specific monkey patch for the next.js router usage of history api
function newHistoryFunction(method: any, lang: string) {
  return (state: any, title: any, url: any) => {
    console.log(state)
    if (!state || !state.__N) {
      return method(state, title, url)
    } else {
      const url_raw = state.as ?? '/'
      method(state, title, url_raw.replace(new RegExp(`^/${lang}`), ''))
    }
  }
}

// only apply patch if we are on language subdomain
if (typeof window !== 'undefined' && /^[a-z]{2}\./.test(window.location.host)) {
  const lang = window.location.host.substring(0, 2)
  if ((languages as string[]).includes(lang)) {
    const pushState = window.history.pushState.bind(window.history)
    const replaceState = window.history.replaceState.bind(window.history)
    window.history.pushState = newHistoryFunction(pushState, lang)
    window.history.replaceState = newHistoryFunction(replaceState, lang)
  }
}
// end of patch

// eslint-disable-next-line import/no-default-export
export default function App({ Component, pageProps, router }: AppProps) {
  const comp = <Component {...pageProps} />
  if (pageProps.pageData) {
    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <FontFix />
          <NProgressStyles />
          <FrontendClientBase {...pageProps} locale={router.locale!}>
            {comp}
          </FrontendClientBase>
          <ToastNotice />
        </ThemeProvider>
      </React.StrictMode>
    )
  }
  return comp
}
