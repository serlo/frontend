import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as Sentry from '@sentry/browser'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'

import { NProgressStyles } from '@/components/navigation/n-progress-styles'
import { ToastNotifications } from '@/components/toast-notifications'
import { theme } from '@/theme'

config.autoAddCss = false

if (
  process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined &&
  process.env.NEXT_PUBLIC_COMMIT_SHA !== undefined
) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENV,
    release: `frontend@${process.env.NEXT_PUBLIC_COMMIT_SHA?.substr(0, 7)}`,
  })
}

const FontFix = createGlobalStyle`
  h1,h2, main b {
    letter-spacing: ${(props) => props.theme.defaults.boldLetterSpacing};
  }
  body {
    letter-spacing: ${(props) => props.theme.defaults.regularLetterSpacing};
  }
`

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

interface ReportWebVitalsData {
  id: string
  name: string
  label: string
  value: number
}

interface Window {
  ga?: (command: string, fields: any[] | string, fieldsObject: object) => void
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: ReportWebVitalsData) {
  if (typeof (window as Window).ga === 'undefined') return
  ;(window as Window).ga!('send', 'event', {
    eventCategory: `Next.js ${label} metric`,
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  })
}
