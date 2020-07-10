import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import { CookieBar } from '@/components/content/cookie-bar'
import { Entity, EntityProps } from '@/components/content/entity'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import { Lazy } from '@/components/content/lazy'
import { LicenseData } from '@/components/content/license-notice'
import { Topic, TopicProp } from '@/components/content/topic'
import type { BreadcrumbsProps } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import type { MetaMenuProps } from '@/components/navigation/meta-menu'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { ErrorPage } from '@/components/pages/error-page'
import { SlugHead } from '@/components/slug-head'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { OriginProvider } from '@/contexts/origin-context'
import { PrettyLinksProvider } from '@/contexts/pretty-links-context'
import { InitialProps, InstanceData, PageData } from '@/data-types'
import { deInstanceData } from '@/data/de'
import { horizonData } from '@/data/horizon'
import {
  getInitialProps,
  fetcherAdditionalData,
} from '@/fetcher/get-initial-props'

const MetaMenu = dynamic<MetaMenuProps>(() =>
  import('@/components/navigation/meta-menu').then((mod) => mod.MetaMenu)
)
const Breadcrumbs = dynamic<BreadcrumbsProps>(() =>
  import('@/components/navigation/breadcrumbs').then((mod) => mod.Breadcrumbs)
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

const Landing = dynamic<{}>(() =>
  import('@/components/pages/landing').then((mod) => mod.Landing)
)
const Search = dynamic<{}>(() =>
  import('@/components/pages/search').then((mod) => mod.Search)
)
const Donations = dynamic<{}>(() =>
  import('@/components/pages/donations').then((mod) => mod.Donations)
)

function renderPage(page: PageData) {
  if (page.kind === 'landing') {
    return <Landing />
  }
  if (page.kind === 'donation') {
    return <Donations />
  }
  if (page.kind === 'search') {
    return <Search />
  }
  if (page.kind === 'error') {
    return <ErrorPage />
  }
}

const PageView: NextPage<PageViewProps> = (props) => {
  // bad code, should be moved somewhere else
  React.useEffect(() => {
    try {
      sessionStorage.setItem(props.fetchedData.alias, JSON.stringify(props))
    } catch (e) {
      //
    }
  }, [props])

  /*






  old code above











  */

  // compat: bridge to existing system,
  const initialProps = props.newInitialProps

  // note: we assume that instance data is passing in the first time this components renders
  // subsequent render calls should be client-side-navigation
  const [instanceData] = React.useState<InstanceData>(
    initialProps?.instanceData!
  )

  if (initialProps) {
    // new code starts here

    // The fetcher can't access react context, so we have to provide the data
    fetcherAdditionalData.origin = initialProps.origin
    fetcherAdditionalData.instance = instanceData.lang

    return (
      <OriginProvider value={initialProps.origin}>
        <InstanceDataProvider value={instanceData}>
          {renderPage(initialProps.pageData)}
        </InstanceDataProvider>
      </OriginProvider>
    )

    // end of new code
  }

  /*









  old code below







  

  */
  if (!props.fetchedData) return null
  const { fetchedData, origin } = props
  const {
    contentId,
    alias,
    horizonIndices,
    breadcrumbs,
    contentType,
    title,
    navigation,
    license,
    prettyLinks,
    type,
    data,
  } = fetchedData

  const showNav =
    navigation && !(contentType === 'TaxonomyTerm' && type === 'topicFolder')

  return (
    <InstanceDataProvider value={deInstanceData}>
      <OriginProvider value={origin}>
        <SlugHead
          title={title}
          fetchedData={fetchedData}
          alias={alias}
          origin={origin}
        />
        <PrettyLinksProvider value={prettyLinks}>
          <Header />
          {showNav && (
            <MetaMenu pagealias={`/${data.id}`} navigation={navigation} />
          )}
          {renderContent()}
          <Footer />
        </PrettyLinksProvider>

        {contentType === 'Page' && data && <NewsletterPopup />}
        <CookieBar />
      </OriginProvider>
    </InstanceDataProvider>
  )

  function renderContent() {
    return (
      <RelativeContainer>
        <MaxWidthDiv showNav={!!showNav}>
          {breadcrumbs && !(contentType === 'Page' && navigation) && (
            <Breadcrumbs entries={breadcrumbs} />
          )}

          <main>
            {fetchedData.contentType === 'TaxonomyTerm' ? (
              <Topic data={fetchedData.data} contentId={contentId} />
            ) : (
              <Entity
                data={fetchedData.data}
                contentId={contentId}
                contentType={contentType}
                license={license}
              />
            )}
          </main>

          <HSpace amount={40} />
          {horizonIndices && (
            <Lazy>
              <Horizon
                entries={horizonIndices.map((index) => horizonData[index])}
              />
            </Lazy>
          )}
        </MaxWidthDiv>
      </RelativeContainer>
    )
  }
}

PageView.getInitialProps = getInitialProps

interface FetchedData {
  contentId: number
  alias: string
  title: string
  horizonIndices: number[]
  breadcrumbs: BreadcrumbsProps['entries']
  navigation: MetaMenuProps['navigation']
  license: LicenseData
  prettyLinks: Record<string, { alias: string }>
  error: boolean
  type?: string
  redirect?: string
}

interface TaxonomyTermFetchedData extends FetchedData {
  contentType: 'TaxonomyTerm'
  data: TopicProp
}

interface IsNotTaxonomyTermFetchedData extends FetchedData {
  contentType: Exclude<EntityProps['contentType'], 'TaxonomyTerm'>
  data: EntityProps['data']
}

export interface PageViewProps {
  fetchedData: TaxonomyTermFetchedData | IsNotTaxonomyTermFetchedData
  origin: string
  page?: string
  newInitialProps?: InitialProps
}

export default PageView
