import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { getInstanceDataByLang } from '@/helper/feature-i18n'
import { htmlEscapeStringForJson } from '@/helper/html-escape'

const bodyStyles = {
  margin: 0,
  fontFamily: 'Karmilla, sans-serif',
}

// See https://docs.sentry.io/platforms/javascript/install/lazy-load-sentry/
const sentryLoader = `
  if (window.Sentry) {
    window.Sentry.init({
      environment: "${process.env.NEXT_PUBLIC_ENV}",
      release: "frontend@${process.env.NEXT_PUBLIC_COMMIT_SHA?.substr(0, 7)}"
    });
    window.Sentry.forceLoad();
  }
`

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
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
    const langData = this.props.__NEXT_DATA__.locale
      ? getInstanceDataByLang(this.props.__NEXT_DATA__.locale)
      : undefined
    return (
      <Html>
        <Head>
          <meta property="og:site_name" content="Serlo" />
          <meta property="og:type" content="website" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/_assets/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/_assets/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/_assets/favicon-16x16.png"
          />
          <link rel="manifest" href="/_assets/site.webmanifest?v=1" />
          <link
            rel="mask-icon"
            href="/_assets/safari-pinned-tab.svg"
            color="#007ec1"
          />
          <link rel="shortcut icon" href="/_assets/favicon.ico" />
          <meta name="msapplication-TileColor" content="#007ec1" />
          <meta
            name="msapplication-config"
            content="/_assets/browserconfig.xml"
          />
          <meta name="theme-color" content="#007ec1"></meta>
          <link
            href="/_assets/opensearch.de.xml"
            rel="search"
            type="application/opensearchdescription+xml"
            title="Serlo (de)"
          />
          <link
            rel="preload"
            href="/_assets/fonts/karmilla/karmilla-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/_assets/fonts/karmilla/karmilla-bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined && (
            <script
              src={`/_assets/sentry/${process.env.NEXT_PUBLIC_SENTRY_DSN.substring(
                8,
                40
              )}.min.js`}
            />
          )}
          {process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined &&
            process.env.NEXT_PUBLIC_COMMIT_SHA !== undefined && (
              <script
                dangerouslySetInnerHTML={{
                  __html: sentryLoader.replace(/[\s]/g, ''),
                }}
              />
            )}
        </Head>
        <body style={bodyStyles}>
          <Main />
          {langData && (
            <script
              type="application/json"
              id="__FRONTEND_CLIENT_INSTANCE_DATA__"
              dangerouslySetInnerHTML={{
                __html: htmlEscapeStringForJson(JSON.stringify(langData)),
              }}
            />
          )}
          <NextScript />
          <script async defer src="https://sa.serlo.org/latest.js" />
          <noscript>
            <img src="https://sa.serlo.org/noscript.gif" alt="" />
          </noscript>
        </body>
      </Html>
    )
  }
}
