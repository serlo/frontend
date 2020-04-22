import React from 'react'
import App from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../public/_assets/fonts/karmilla.css'
import '../public/_assets/fonts/katex/katex.css'

import { ThemeProvider } from 'styled-components'
import { theme } from '../src/theme'

import * as Sentry from '@sentry/browser'

const { version } = require('../package.json')

Sentry.init({
  dsn: process.env.SENTRY_DSN, //process.env.NODE_ENV === 'production' ?  : undefined,
  release: `serlo-org-client@${version}`
})

/*
docs say it's not available for js anyway:
,
  whitelistUrls: [
    'serlo.org',
    'serlo-development.dev',
    'serlo-staging.dev',
    'frontend-sooty-ten.now.sh',
    'frontend.dal123.now.sh'
  ]
*/

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default MyApp
