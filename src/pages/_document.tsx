import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import * as Sentry from '@sentry/browser'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const bodyStyles = {
  margin: 0,
  fontFamily: 'Karmilla, sans-serif',
}

if (process.env.SENTRY_DSN !== undefined) {
  process.on('unhandledRejection', (err) => {
    Sentry.captureException(err)
  })

  process.on('uncaughtException', (err) => {
    Sentry.captureException(err)
  })
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
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
          <link
            href="/opensearch.de.xml"
            rel="search"
            type="application/opensearchdescription+xml"
            title="Serlo (de)"
          />
        </Head>
        <body style={bodyStyles}>
          <Main />
          <NextScript />
          {process.env.GA_TRACKING_ID !== undefined && <GoogleAnalytics />}
        </body>
      </Html>
    )
  }
}
