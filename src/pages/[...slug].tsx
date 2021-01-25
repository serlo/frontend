import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import { EntityProps } from '@/components/content/entity'
import { TopicProps } from '@/components/content/topic'
import { EntityBaseProps } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { ProfileProps } from '@/components/pages/user/profile'
import { InitialProps, ErrorData, PageData } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'

const EntityBase = dynamic<EntityBaseProps>(() =>
  import('@/components/entity-base').then((mod) => mod.EntityBase)
)
const ErrorPage = dynamic<ErrorData>(() =>
  import('@/components/pages/error-page').then((mod) => mod.ErrorPage)
)
const Profile = dynamic<ProfileProps>(() =>
  import('@/components/pages/user/profile').then((mod) => mod.Profile)
)
const Topic = dynamic<TopicProps>(() =>
  import('@/components/content/topic').then((mod) => mod.Topic)
)
const Entity = dynamic<EntityProps>(() =>
  import('@/components/content/entity').then((mod) => mod.Entity)
)

const PageView: NextPage<InitialProps> = (initialProps) => {
  const pageData = initialProps.pageData

  if (pageData === undefined) return <ErrorPage code={404} />

  const page = getPage()

  //fallback, should be handled by CFWorker
  if (pageData.kind === 'redirect') {
    if (typeof window !== 'undefined') {
      window.location.href = pageData.target!
    }
    return (
      <FrontendClientBase>
        <LoadingSpinner noText />
      </FrontendClientBase>
    )
  }

  if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy')
    return (
      <FrontendClientBase noContainers>
        <EntityBase page={pageData}>{page}</EntityBase>
      </FrontendClientBase>
    )

  return <FrontendClientBase>{page}</FrontendClientBase>

  function getPage() {
    switch (pageData.kind) {
      case 'error':
        return (
          <ErrorPage
            code={pageData.errorData.code}
            message={pageData.errorData.message}
          />
        )
      case 'user/profile':
        return <Profile userData={pageData.userData} />

      case 'single-entity':
        return <Entity data={pageData.entityData} />

      case 'taxonomy':
        return <Topic data={pageData.taxonomyData} />
    }
    return 'are you a wizard?'
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const alias = (context.params?.slug as string[]).join('/')
  const pageData = await fetchPageData('/' + context.locale! + '/' + alias)
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as PageData, // remove undefined values
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
