import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import { Entity } from '@/components/content/entity'
import { Topic } from '@/components/content/topic'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { ErrorPage } from '@/components/pages/error-page'
import { SlugProps, SlugPageData, PageWithWrapper } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'

const PageView: NextPage<SlugProps> = (initialProps) => {
  const pageData = initialProps.pageData

  //fallback, should be handled by CFWorker
  if (pageData.kind === 'redirect') {
    if (typeof window !== 'undefined') {
      window.location.href = pageData.target!
    }
    return <LoadingSpinner noText />
  }

  if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy') {
    return pageData.kind === 'single-entity' ? (
      <Entity data={pageData.entityData} />
    ) : (
      <Topic data={pageData.taxonomyData} />
    )
  }

  return (
    <ErrorPage
      code={pageData.kind === 'error' ? pageData.errorData.code : 400}
      message={
        pageData.kind === 'error'
          ? pageData.errorData.message
          : 'unsupported type'
      }
    />
  )
}

// eslint-disable-next-line react/display-name
;(PageView as typeof PageView & PageWithWrapper<SlugProps>).wrapper = (
  child,
  props
) => {
  if (props.pageData === undefined)
    return (
      <FrontendClientBase noHeaderFooter>
        <ErrorPage code={404} />
      </FrontendClientBase>
    )

  if (
    props.pageData.kind == 'single-entity' ||
    props.pageData.kind == 'taxonomy'
  ) {
    return (
      <FrontendClientBase noContainers>
        <EntityBase page={props.pageData}>{child}</EntityBase>
      </FrontendClientBase>
    )
  }
  return <FrontendClientBase>{child}</FrontendClientBase>
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const alias = (context.params?.slug as string[]).join('/')
  const pageData = await fetchPageData('/' + context.locale! + '/' + alias)
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugPageData, // remove undefined values
    },
    revalidate: 1,
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default PageView
