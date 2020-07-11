import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as Sentry from '@sentry/browser'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

// eslint-disable-next-line import/no-unassigned-import
import '../../public/_assets/fonts/karmilla.css'
// eslint-disable-next-line import/no-unassigned-import
import '../../public/_assets/fonts/katex/katex.css'

import { version } from '../../package.json'
import { CookieBar } from '@/components/content/cookie-bar'
import { Entity } from '@/components/content/entity'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import { Lazy } from '@/components/content/lazy'
import { HeadTags } from '@/components/head-tags'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { MetaMenu } from '@/components/navigation/meta-menu'
import { NProgressStyles } from '@/components/navigation/n-progress-styles'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { ErrorPage } from '@/components/pages/error-page'
import { ToastNotifications } from '@/components/toast-notifications'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { OriginProvider } from '@/contexts/origin-context'
import { InitialProps, InstanceData, PageData } from '@/data-types'
import { fetcherAdditionalData } from '@/fetcher/get-initial-props'
import { theme } from '@/theme'

const Landing = dynamic<{}>(() =>
  import('@/components/pages/landing').then((mod) => mod.Landing)
)
const Search = dynamic<{}>(() =>
  import('@/components/pages/search').then((mod) => mod.Search)
)
const Donations = dynamic<{}>(() =>
  import('@/components/pages/donations').then((mod) => mod.Donations)
)

const NewsletterPopup = dynamic<{}>(
  () =>
    import('@/components/scripts/newsletter-popup').then(
      (mod) => mod.NewsletterPopup
    ),
  {
    ssr: false,
  }
)

config.autoAddCss = false

if (process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    release: `frontend@${version}-${process.env.NEXT_PUBLIC_COMMIT_SHA?.substr(
      0,
      7
    )}`,
  })
}

const FontFix = createGlobalStyle`
  h1,h2, main b {
    letter-spacing: ${(props) => props.theme.defaults.boldLetterSpacing};
  }
  body {
    letter-spacing: ${(props) => props.theme.defaults.regularLetterSpacing};
  }
`

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// eslint-disable-next-line import/no-default-export
export default function App({ Component, pageProps }: AppProps) {
  const initialProps: InitialProps = pageProps.newInitialProps

  // note: we assume that instance data is passing in the first time this components renders
  // subsequent render calls should be client-side-navigation
  const [instanceData] = React.useState<InstanceData>(
    initialProps?.instanceData!
  )

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <FontFix />
        <NProgressStyles />
        {(() => {
          if (pageProps.newInitialProps) {
            // new render path
            fetcherAdditionalData.origin = initialProps.origin
            fetcherAdditionalData.instance = instanceData.lang

            return (
              <OriginProvider value={initialProps.origin}>
                <InstanceDataProvider value={instanceData}>
                  {renderPage(initialProps.pageData)}
                </InstanceDataProvider>
              </OriginProvider>
            )
          } else {
            // compat: this is the old render and will deprecate soon
            console.log('render app with old render path')
            return <Component {...pageProps} />
          }
        })()}
        <ToastNotifications />
      </ThemeProvider>
    </React.StrictMode>
  )
}

function renderPage(page: PageData) {
  if (page.kind === 'donation') {
    return <Donations />
  } else {
    // all other kinds are using basic layout
    // render it together to avoid remounting
    return (
      <>
        <Header onSearchPage={page.kind === 'search'} />
        {(() => {
          if (page.kind === 'landing') {
            return <Landing />
          }
          if (page.kind === 'search') {
            return <Search />
          }
          if (page.kind === 'error') {
            return <ErrorPage />
          }
          return (
            <>
              {page.secondaryNavigationData && (
                <MetaMenu data={page.secondaryNavigationData} />
              )}
              {page.metaData && <HeadTags data={page.metaData} />}
              {page.newsletterPopup && <NewsletterPopup />}
              <RelativeContainer>
                <MaxWidthDiv showNav={!!page.secondaryNavigationData}>
                  {page.breadcrumbsData && (
                    <Breadcrumbs data={page.breadcrumbsData} />
                  )}
                  <main>
                    {(() => {
                      if (page.kind === 'single-entity') {
                        return <Entity data={page.entityData} />
                      } /* taxonomy */ else {
                        return <HSpace amount={500} />
                      }
                    })()}
                  </main>
                  <HSpace amount={40} />
                  {page.horizonData && (
                    <Lazy>
                      <Horizon data={page.horizonData} />
                    </Lazy>
                  )}
                </MaxWidthDiv>
              </RelativeContainer>
            </>
          )
        })()}
        <Footer />
        <CookieBar />
      </>
    )
  }
}

interface ReportWebVitalsData {
  id: string
  name: string
  label: string
  value: number
}

interface Window {
  ga?: (command: string, fields: any[] | string, fieldsObject: object) => void
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: ReportWebVitalsData) {
  if (typeof (window as Window).ga === 'undefined') return
  ;(window as Window).ga!('send', 'event', {
    eventCategory: `Next.js ${label} metric`,
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  })
}
