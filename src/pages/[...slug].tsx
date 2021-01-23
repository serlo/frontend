import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

import { RevisionProps } from '@/components/author/revision'
import { EntityProps } from '@/components/content/entity'
import { TopicProps } from '@/components/content/topic'
import { EntityBaseProps } from '@/components/entity-base'
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

const Revision = dynamic<RevisionProps>(() =>
  import('@/components/author/revision').then((mod) => mod.Revision)
)

const PageView: NextPage<InitialProps> = (initialProps) => {
  const page = initialProps.pageData
  if (page === undefined) return <ErrorPage code={404} />
  if (page.kind === 'error') {
    return (
      <ErrorPage code={page.errorData.code} message={page.errorData.message} />
    )
  }
  if (page.kind === 'user/profile') {
    return <Profile userData={page.userData} />
  }
  if (page.kind === 'license-detail' || page.kind === 'donation') {
    return null // have own pages…
  }

  const entity =
    page.kind === 'single-entity' ? (
      <Entity data={page.entityData} />
    ) : page.kind === 'revision' ? (
      <Revision data={page.revisionData} />
    ) : page.kind === 'taxonomy' ? (
      <Topic data={page.taxonomyData} />
    ) : (
      'are you a wizard?'
    )

  return <EntityBase page={page}>{entity}</EntityBase>
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
