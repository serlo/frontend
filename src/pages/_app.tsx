import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NextComponentType, NextPageContext } from 'next'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { NProgressStyles } from '@/components/navigation/n-progress-styles'
import { InitialProps } from '@/data-types'
import { FontFix } from '@/helper/css'
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

interface CustomAppProps {
  Component: NextComponentType<NextPageContext, any, InitialProps>
  pageProps: InitialProps
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const noHeaderFooter = pageProps.pageData?.kind === 'donation'

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <FontFix />
        <NProgressStyles />
        <FrontendClientBase>
          {noHeaderFooter ? (
            <Component {...pageProps} />
          ) : (
            <HeaderFooter>
              <Component {...pageProps} />
            </HeaderFooter>
          )}
        </FrontendClientBase>
      </ThemeProvider>
    </React.StrictMode>
  )
}
