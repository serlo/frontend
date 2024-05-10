import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { Instance } from '@/fetcher/graphql-types/operations'
import { colors } from '@/helper/colors'
import { getInstanceDataByLang } from '@/helper/feature-i18n'
import { htmlEscapeStringForJson } from '@/helper/html-escape'

const bodyStyles = {
  fontFamily: 'Karla, sans-serif',
  backgroundColor: '#fff',
}

// See https://docs.sentry.io/platforms/javascript/install/lazy-load-sentry/
const sentryLoader = `
  if (window.Sentry) {
    window.Sentry.init({
      environment: "${process.env.NEXT_PUBLIC_ENV}",
      release: "frontend@${
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 7) ?? ''
      }",
      beforeSend(event, hint) {
        /* ignore safari warning in JsonLd component */
        const error = hint.originalException;
        if (
          error &&
          error.message &&
          error.message.startsWith('r["@context"].toLowerCase')
        ) {
          return null
        }
        return event;
      },
    });
    window.Sentry.forceLoad();
  }
`

export default class MyDocument extends Document {
  render() {
    const langData = this.props.__NEXT_DATA__.locale
      ? getInstanceDataByLang(this.props.__NEXT_DATA__.locale as Instance)
      : undefined
    return (
      <Html className="bg-brand-100 print:serlo-print-style" id="serlo-root">
        {/* background on html for overscroll area */}
        <Head>
          <meta property="og:site_name" content="Serlo" />
          <meta property="og:type" content="website" />
          <meta name="robots" content="max-image-preview:large" />
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
            color={colors.brand}
          />
          <link rel="shortcut icon" href="/_assets/favicon.ico" />
          <meta name="msapplication-TileColor" content={colors.brand} />
          <meta
            name="msapplication-config"
            content="/_assets/browserconfig.xml"
          />
          <meta name="theme-color" content={colors.brand}></meta>
          <link
            href="/_assets/opensearch.de.xml"
            rel="search"
            type="application/opensearchdescription+xml"
            title="Serlo (de)"
          />
          <link
            rel="preload"
            href="/_assets/fonts/karla/karla-variable.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/_assets/fonts/caveat/caveat-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          {process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined && (
            // script is very small and bootstraps sentry
            // eslint-disable-next-line @next/next/no-sync-scripts
            <script
              src={`/_assets/sentry/${process.env.NEXT_PUBLIC_SENTRY_DSN.substring(
                8,
                40
              )}.min.js`}
            />
          )}
          {process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined &&
            process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA !== undefined && (
              <script
                dangerouslySetInnerHTML={{
                  __html: sentryLoader,
                }}
              />
            )}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.sa_event=window.sa_event||function(){a=[].slice.call(arguments);sa_event.q?sa_event.q.push(a):sa_event.q=[a]};`,
            }}
          ></script>
          <Script
            src="https://repo.vidis.schule/repository/vidis-
cdn/latest/vidisLogin.umd.js"
          />
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://sa.serlo.org/noscript.gif" alt="" />
            <style>{`.superspecial-noscript-hidden { display: none; }`}</style>
          </noscript>
        </body>
      </Html>
    )
  }
}
