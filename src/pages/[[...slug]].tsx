import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import { useAuth } from '@/auth/use-auth'
import { CookieBar } from '@/components/content/cookie-bar'
import { EntityProps } from '@/components/content/entity'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import { Lazy } from '@/components/content/lazy'
import { TopicProps } from '@/components/content/topic'
import { HeadTags } from '@/components/head-tags'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { MetaMenu } from '@/components/navigation/meta-menu'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { LandingInternationalProps } from '@/components/pages/landing-international'
import { ProfileProps } from '@/components/pages/user/profile'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { OriginProvider } from '@/contexts/origin-context'
import {
  InitialProps,
  InstanceData,
  PageData,
  ErrorData,
  LoggedInData,
} from '@/data-types'
import {
  fetcherAdditionalData,
  getInitialProps,
} from '@/fetcher/get-initial-props'

const LandingDE = dynamic<{}>(() =>
  import('@/components/pages/landing-de').then((mod) => mod.LandingDE)
)
const LandingInternational = dynamic<LandingInternationalProps>(() =>
  import('@/components/pages/landing-international').then(
    (mod) => mod.LandingInternational
  )
)
const Search = dynamic<{}>(() =>
  import('@/components/pages/search').then((mod) => mod.Search)
)
const Donations = dynamic<{}>(() =>
  import('@/components/pages/donations').then((mod) => mod.Donations)
)
const ErrorPage = dynamic<ErrorData>(() =>
  import('@/components/pages/error-page').then((mod) => mod.ErrorPage)
)
const Notifications = dynamic<{}>(() =>
  import('@/components/pages/user/notifications').then(
    (mod) => mod.Notifications
  )
)
const Profile = dynamic<ProfileProps>(() =>
  import('@/components/pages/user/profile').then((mod) => mod.Profile)
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
const Topic = dynamic<TopicProps>(() =>
  import('@/components/content/topic').then((mod) => mod.Topic)
)
const Entity = dynamic<EntityProps>(() =>
  import('@/components/content/entity').then((mod) => mod.Entity)
)

const PageView: NextPage<InitialProps> = (initialProps) => {
  // note: we assume that instance data is passing in the first time this components renders
  // subsequent render calls should be client-side-navigation
  const [instanceData] = React.useState<InstanceData>(
    initialProps?.instanceData!
  )

  React.useEffect(storePageData, [initialProps])

  fetcherAdditionalData.origin = initialProps.origin
  fetcherAdditionalData.instance = instanceData.lang

  const auth = useAuth()
  const [loggedInData, setLoggedInData] = React.useState<LoggedInData | null>(
    getCachedLoggedInData()
  )

  React.useEffect(fetchLoggedInData, [
    auth,
    initialProps.origin,
    instanceData.lang,
    loggedInData,
  ])

  // dev
  //console.dir(initialProps)

  return (
    <OriginProvider value={initialProps.origin}>
      <InstanceDataProvider value={instanceData}>
        <LoggedInDataProvider value={loggedInData}>
          {renderPage(initialProps.pageData)}
        </LoggedInDataProvider>
      </InstanceDataProvider>
    </OriginProvider>
  )

  function storePageData() {
    try {
      const pageData = initialProps?.pageData
      if (pageData) {
        if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy') {
          if (pageData.cacheKey)
            sessionStorage.setItem(pageData.cacheKey, JSON.stringify(pageData))
        }
      }
    } catch (e) {
      //
    }
  }

  function getCachedLoggedInData() {
    if (typeof window === 'undefined') return null
    const cacheValue = sessionStorage.getItem(
      `___loggedInData_${instanceData.lang}`
    )
    if (!cacheValue) return null
    return JSON.parse(cacheValue)
  }

  function fetchLoggedInData() {
    if (auth.current && !loggedInData) {
      void (async () => {
        const res = await fetch(
          initialProps.origin + '/api/locale/' + instanceData.lang
        )
        const json = await res.json()
        sessionStorage.setItem(
          `___loggedInData_${instanceData.lang}`,
          JSON.stringify(json)
        )
        setLoggedInData(json)
      })()
    }
  }
}

function renderPage(page: PageData) {
  //TODO: investigate why this happens sometimes.
  if (page === undefined) return <ErrorPage code={1234567890} />

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
            if (page.landingData) {
              return <LandingInternational data={page.landingData} />
            }
            return <LandingDE />
          }
          if (page.kind === 'search') {
            return <Search />
          }
          if (page.kind === 'user/notifications') {
            return <Notifications />
          }
          if (page.kind === 'user/profile') {
            return <Profile userData={page.userData} />
          }
          if (page.kind === 'error') {
            return <ErrorPage code={page.errorData.code} />
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
                    <Breadcrumbs
                      data={page.breadcrumbsData}
                      isTaxonomy={page.kind !== 'single-entity'}
                    />
                  )}
                  <main>
                    {(() => {
                      if (page.kind === 'single-entity') {
                        return <Entity data={page.entityData} />
                      } /* taxonomy */ else {
                        return <Topic data={page.taxonomyData} />
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

PageView.getInitialProps = getInitialProps

export default PageView
