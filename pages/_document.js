import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import * as Sentry from '@sentry/browser'
import GoogleAnalytics from '../src/components/GoogleAnalytics'

const bodyStyles = {
  margin: 0,
  fontFamily: 'Karmilla, sans-serif',
  letterSpacing: '-0.007em'
}

process.on('unhandledRejection', err => {
  Sentry.captureException(err)
})

process.on('uncaughtException', err => {
  Sentry.captureException(err)
})

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <meta property="og:site_name" content="Serlo" />
          <meta property="og:type" content="website" />
        </Head>
        <body style={bodyStyles}>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
        </body>
      </Html>
    )
  }
}
