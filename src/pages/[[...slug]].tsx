import { NextPage } from 'next'
import absoluteUrl from 'next-absolute-url'
import dynamic from 'next/dynamic'
import React from 'react'
import styled, { css } from 'styled-components'

import { CookieBar } from '@/components/content/cookie-bar'
import { Entity, EntityProps } from '@/components/content/entity'
import { ErrorPage } from '@/components/content/error-page'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import { LicenseNoticeData } from '@/components/content/license-notice'
import { Topic, TopicProp } from '@/components/content/topic'
import type { BreadcrumbsProps } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import type { MetaMenuProps } from '@/components/navigation/meta-menu'
import { SlugHead } from '@/components/slug-head'
import { PrettyLinksProvider } from '@/contexts/pretty-links-context'
import { horizonData } from '@/data/horizon'

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

interface FetchedData {
  contentId: number
  alias: string
  title: string
  horizonIndices: number[]
  breadcrumbs: BreadcrumbsProps['entries']
  navigation: MetaMenuProps['navigation']
  license: LicenseNoticeData
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
}

const PageView: NextPage<PageViewProps> = (props) => {
  React.useEffect(() => {
    try {
      sessionStorage.setItem(props.fetchedData.alias, JSON.stringify(props))
    } catch (e) {
      //
    }
  }, [props])
  if (!props.fetchedData) return null
  const { fetchedData, origin, page } = props
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
    error,
    type,
    data,
  } = fetchedData

  const showNav =
    navigation && !(contentType === 'TaxonomyTerm' && type === 'topicFolder')

  if (page === 'spenden') return <Donations />

  return (
    <>
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
    </>
  )

  function renderContent() {
    if (page !== undefined) {
      if (page === 'landing') return <Landing />
      if (page === 'search') return <Search />
    }

    return (
      <RelatveContainer>
        <MaxWidthDiv showNav={!!showNav}>
          {error && <ErrorPage alias={alias} />}

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
            <Horizon
              entries={horizonIndices.map((index) => horizonData[index])}
            />
          )}
        </MaxWidthDiv>
      </RelatveContainer>
    )
  }
}

const RelatveContainer = styled.div`
  position: relative;
`

const MaxWidthDiv = styled.div<{ showNav?: boolean }>`
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.sm}) AND (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    margin: 0 0 0 51px;
  }

  ${(props) =>
    props.showNav &&
    css`
      @media (min-width: ${(props) =>
          props.theme.breakpoints.md}) AND (max-width: ${(props) =>
          props.theme.breakpoints.lg}) {
        margin: 0 0 0 200px;
      }
    `}
`

PageView.getInitialProps = async (props) => {
  const slug =
    props.query.slug === undefined ? [] : (props.query.slug as string[])
  const joinedSlug = slug.join('/')
  const { origin } = absoluteUrl(props.req)

  if (
    joinedSlug === '' ||
    joinedSlug === 'search' ||
    joinedSlug === 'spenden'
  ) {
    //TODO: Probaby add another type for FetchedData pages
    // also check what values we might actually need to feed slug-head
    return ({
      fetchedData: {},
      page: joinedSlug === '' ? 'landing' : joinedSlug,
      origin: origin,
    } as unknown) as PageViewProps
  }
  //TODO: maybe also add api pages?

  if (typeof window === 'undefined') {
    const res = await fetch(
      `${origin}/api/frontend/${encodeURIComponent(joinedSlug)}?redirect`
    )

    const fetchedData = (await res.json()) as PageViewProps['fetchedData']
    // compat course to first page
    if (fetchedData.redirect) {
      props.res?.writeHead(301, {
        Location: fetchedData.redirect,
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      })
      props.res?.end()
      // We redirect here so the component won't be actually rendered
      return ({} as unknown) as PageViewProps
    }

    if (fetchedData.error) {
      props.res!.statusCode = 404
    }

    return { fetchedData, origin }
  } else {
    //client

    const url = '/' + joinedSlug

    getGa()('set', 'page', url)
    getGa()('send', 'pageview')
    try {
      const fromCache = sessionStorage.getItem(url)
      if (fromCache) {
        return JSON.parse(fromCache) as PageViewProps
      }
    } catch (e) {
      //
    }
    const origin = window.location.host
    const protocol = window.location.protocol
    const res = await fetch(`${protocol}//${origin}/api/frontend${url}`)
    const fetchedData = (await res.json()) as PageViewProps['fetchedData']
    // compat: redirect of courses
    if (fetchedData.redirect) {
      const res = await fetch(
        `${protocol}//${origin}/api/frontend${fetchedData.redirect}`
      )
      const fetchedData2 = (await res.json()) as PageViewProps['fetchedData']
      return { fetchedData: fetchedData2, origin }
    }
    return { fetchedData, origin }
  }
}

export default PageView

/* eslint-disable */
// Safe access to Google Analytics globals
function getGa(): (...args: any[]) => void {
  const w = (window as unknown) as any
  const ga = w[w['GoogleAnalyticsObject'] || 'ga']
  return ga || (() => {})
}
/* eslint-enable */
