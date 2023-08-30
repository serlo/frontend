import { Polyfills } from './polyfills'
import { colors } from '@/helper/colors'

// add font-faces to global css
import '@/assets-webkit/fonts/default.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

const bodyStyles = {
  fontFamily: 'Karmilla, sans-serif',
  backgroundColor: '#fff',
}

// See https://docs.sentry.io/platforms/javascript/install/lazy-load-sentry/
const sentryLoader = `
  if (window.Sentry) {
    window.Sentry.init({
      environment: "${process.env.NEXT_PUBLIC_ENV}",
      release: "frontend@${
        process.env.NEXT_PUBLIC_COMMIT_SHA?.substring(0, 7) ?? ''
      }"
    });
    window.Sentry.forceLoad();
  }
`

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang?: string }
}) {
  return (
    <html className="bg-brand-100 print:serlo-print-style" lang={params.lang}>
      {/* background on html for overscroll area */}
      <head>
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
        <link
          rel="preload"
          href="/_assets/fonts/karmilla/karmilla-bolder.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/_assets/fonts/caveat/caveat-bold.woff2"
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
          process.env.NEXT_PUBLIC_COMMIT_SHA !== undefined && (
            <script
              dangerouslySetInnerHTML={{
                __html: sentryLoader.replace(/[\s]/g, ''),
              }}
            />
          )}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.sa_event=window.sa_event||function(){a=[].slice.call(arguments);sa_event.q?sa_event.q.push(a):sa_event.q=[a]};`,
          }}
        ></script>
      </head>
      <body style={bodyStyles}>
        <Polyfills />
        {children}
        <script async defer src="https://sa.serlo.org/latest.js" />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://sa.serlo.org/noscript.gif" alt="" />
          <style>{`.superspecial-noscript-hidden { display: none; }`}</style>
        </noscript>
      </body>
    </html>
  )
}
