import type { Metadata } from 'next'

import { Polyfills } from './polyfills'
// add font-faces to global css
import '@/assets-webkit/fonts/default.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'
import { colors } from '@/helper/colors'

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

export const metadata: Metadata = {
  themeColor: colors.brand,
  manifest: '/_assets/site.webmanifest?v=1',
  icons: {
    icon: [
      {
        url: '/_assets/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/_assets/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/_assets/favicon.ico',
    other: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/_assets/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        url: '/_assets/safari-pinned-tab.svg',
        color: colors.brand,
      },
    ],
  },
  robots: { googleBot: { 'max-image-preview': 'large' } },
  openGraph: {
    siteName: 'serlo.org',
    type: 'website',
  },
}

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
        <link
          href="/_assets/opensearch.de.xml"
          rel="search"
          type="application/opensearchdescription+xml"
          title="Serlo (de)"
        />
        {/* TODO: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#resource-hints */}
        {/* or other modern font loading apprach */}
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
      <body style={bodyStyles} id="__next">
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
