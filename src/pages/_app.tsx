import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as Sentry from '@sentry/browser'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { version } from '../../package.json'
import { ToastNotifications } from '@/components/toast-notifications'
import { theme } from '@/theme'
// eslint-disable-next-line import/no-unassigned-import
import '../../public/_assets/fonts/karmilla.css'
// eslint-disable-next-line import/no-unassigned-import
import '../../public/_assets/fonts/katex/katex.css'

config.autoAddCss = false

if (process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    release: `frontend@${version}-${process.env.NEXT_PUBLIC_COMMIT_SHA?.substr(
      0,
      7
    )}`,
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

const NProgressStyles = createGlobalStyle`
  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background-color: ${(props) => props.theme.colors.brand};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 4px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${(props) => props.theme.colors.brand}, 0 0 5px ${(
  props
) => props.theme.colors.brand};
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 25px;
    height: 25px;
    box-sizing: border-box;

    border: solid 3px transparent;
    border-top-color: ${(props) => props.theme.colors.brand};
    border-left-color: ${(props) => props.theme.colors.brand};
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
