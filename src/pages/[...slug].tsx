import { GetServerSideProps } from 'next'
import absoluteUrl from 'next-absolute-url'
import dynamic from 'next/dynamic'
import React from 'react'
import styled, { css } from 'styled-components'

import { CookieBar } from '@/components/content/cookie-bar'
import { Entity } from '@/components/content/entity'
import { ErrorPage } from '@/components/content/error-page'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import type { BreadcrumbsProps } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import type { MetaMenuProps } from '@/components/navigation/meta-menu'
import { PrettyLinksProvider } from '@/components/pretty-links-context'
import { SlugHead } from '@/components/slug-head'
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

export interface PageViewProps {
  fetchedData: {
    contentId: string
    alias: string
    title: string
    horizonIndices: number[]
    breadcrumbs: BreadcrumbsProps['entries']
    contentType: string
    navigation: MetaMenuProps['navigation']
    license: string
    prettyLinks: Record<string, { alias: string }>
    error: boolean
    type?: string
    data: EditorState
  }
  origin: string
}

export interface EditorState {
  children: unknown[]
  type?: string
}

function PageView(props: PageViewProps) {
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
    error,
    type,
    data,
  } = fetchedData

  const showNav =
    navigation && !(contentType === 'TaxonomyTerm' && type === 'topicFolder')

  return (
    <>
      <SlugHead
        title={title}
        data={data}
        alias={alias}
        contentType={contentType}
        origin={origin}
      />
      <Header />
      {showNav && (
        <MetaMenu pagealias={`/${data.id}`} navigation={navigation} />
      )}
      <RelatveContainer>
        <MaxWidthDiv showNav={!!showNav}>
          <PrettyLinksProvider value={prettyLinks}>
            {error && <ErrorPage alias={alias} />}

            {breadcrumbs && !(contentType === 'Page' && navigation) && (
              <Breadcrumbs entries={breadcrumbs} />
            )}
            {/* TODO: put this part into entity.tsx */}

            <Entity
              data={data}
              contentId={contentId}
              contentType={contentType}
              license={license}
            />

            <HSpace amount={40} />
            {horizonIndices && (
              <Horizon
                entries={horizonIndices.map((index) => horizonData[index])}
              />
            )}
          </PrettyLinksProvider>
        </MaxWidthDiv>
      </RelatveContainer>
      <Footer />
      {contentType === 'Page' && data && <NewsletterPopup />}
      <CookieBar />
    </>
  )
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

// PageView.getInitialProps = async ({ req, res }) => {
//   const { origin } = absoluteUrl(req)
//   //const resp = await fetch(`${origin}/api/users`)
//   //const users = await resp.json()
//   console.log(origin)
// }

// -> You can not use getInitialProps with getServerSideProps. Please remove getInitialProps. /[...slug]

// TODO: needs type declaration
export const getServerSideProps: GetServerSideProps<any, any> = async (
  props
) => {
  const { origin } = absoluteUrl(props.req)
  const res = await fetch(
    `${origin}/api/frontend/${encodeURIComponent(
      props.params.slug.join('/')
    )}?redirect`
  )
  const fetchedData = await res.json()
  // compat course to first page
  if (fetchedData.redirect) {
    props.res.writeHead(301, {
      Location: encodeURI(fetchedData.redirect),
      // Add the content-type for SEO considerations
      'Content-Type': 'text/html; charset=utf-8',
    })
    props.res.end()
    // compat: return empty props
    return { props: {} }
  }

  if (fetchedData.error) {
    props.res.statusCode = 404
  }

  return { props: { fetchedData, origin } }
}

export default PageView
