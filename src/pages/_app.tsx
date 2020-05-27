import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as Sentry from '@sentry/browser'
import { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { version } from '../../package.json'
import { Theme, theme } from '@/theme'
// eslint-disable-next-line import/no-unassigned-import
import '../../public/_assets/fonts/karmilla.css'
// eslint-disable-next-line import/no-unassigned-import
import '../../public/_assets/fonts/katex/katex.css'

config.autoAddCss = false

if (process.env.SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: `frontend@${version}-${process.env.VERCEL_GITHUB_COMMIT_SHA!}`,
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

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <FontFix />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
