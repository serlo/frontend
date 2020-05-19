import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import * as Sentry from '@sentry/browser'
import GoogleAnalytics from '../src/components/GoogleAnalytics'

const bodyStyles = {
  margin: 0,
  fontFamily: 'Karmilla, sans-serif'
}

if (process.env.SENTRY_DSN !== undefined) {
  process.on('unhandledRejection', err => {
    Sentry.captureException(err)
  })

  process.on('uncaughtException', err => {
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

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0b7ec2" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#0b7ec2" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#ff0000"></meta>
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
