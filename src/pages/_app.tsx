import React from 'react'
import App from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../../public/_assets/fonts/karmilla.css'
import '../../public/_assets/fonts/katex/katex.css'

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Theme, theme } from '@/theme'

import * as Sentry from '@sentry/browser'

import { version } from '../../package.json'

if (process.env.SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: `frontend@${version}-${process.env.VERCEL_GITHUB_COMMIT_SHA}`,
  })
}

const FontFix = createGlobalStyle`
  h1,h2, main b {
    letter-spacing: ${(props) =>
      (props.theme as Theme).defaults.boldLetterSpacing};
  }
  body {
    letter-spacing: ${(props) =>
      (props.theme as Theme).defaults.regularLetterSpacing};
  }
`

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <FontFix />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default MyApp
