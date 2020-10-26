import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'

import { NProgressStyles } from '@/components/navigation/n-progress-styles'
import { ToastNotifications } from '@/components/toast-notifications'
import { FontFix } from '@/helper/css'
import { theme } from '@/theme'

config.autoAddCss = false

if (
  process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined &&
  process.env.NEXT_PUBLIC_COMMIT_SHA !== undefined &&
  typeof window !== 'undefined'
) {
  ;(window as any).Sentry?.init({
    environment: process.env.NEXT_PUBLIC_ENV,
    release: `frontend@${process.env.NEXT_PUBLIC_COMMIT_SHA?.substr(0, 7)}`,
  })
  ;(window as any).Sentry?.forceLoad()
}

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// eslint-disable-next-line import/no-default-export
export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <FontFix />
        <NProgressStyles />
        <Component {...pageProps} />
        <ToastNotifications />
      </ThemeProvider>
    </React.StrictMode>
  )
}
