import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

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
import { InstanceDataProvider } from '@/contexts/instance-context'
import { OriginProvider } from '@/contexts/origin-context'
import { InitialProps, InstanceData, PageData } from '@/data-types'
import {
  fetcherAdditionalData,
  getInitialProps,
} from '@/fetcher/get-initial-props'

const Landing = dynamic<{}>(() =>
  import('@/components/pages/landing').then((mod) => mod.Landing)
)
const Search = dynamic<{}>(() =>
  import('@/components/pages/search').then((mod) => mod.Search)
)
const Donations = dynamic<{}>(() =>
  import('@/components/pages/donations').then((mod) => mod.Donations)
)
const ErrorPage = dynamic<{}>(() =>
  import('@/components/pages/error-page').then((mod) => mod.ErrorPage)
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

  React.useEffect(() => {
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
  }, [initialProps])

  fetcherAdditionalData.origin = initialProps.origin
  fetcherAdditionalData.instance = instanceData.lang

  return (
    <OriginProvider value={initialProps.origin}>
      <InstanceDataProvider value={instanceData}>
        {renderPage(initialProps.pageData)}
      </InstanceDataProvider>
    </OriginProvider>
  )
}

function renderPage(page: PageData) {
  //TODO: investigate why this happens sometimes.
  if (page === undefined) return <ErrorPage />

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
