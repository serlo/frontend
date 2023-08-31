import { GetStaticPaths, GetStaticProps } from 'next'

import { Entity } from '@/components/content/entity'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Topic } from '@/components/taxonomy/topic'
import { SlugProps } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { prettifyLinks } from '@/fetcher/prettify-links'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  //fallback, should be handled by CFWorker, (useful for localhost only)
  if (pageData.kind === 'redirect') {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = pageData.target!
      }, 1000)
    }
    return (
      <FrontendClientBase>
        <LoadingSpinner noText />
      </FrontendClientBase>
    )
  }

  const page =
    pageData.kind === 'single-entity' ? (
      <Entity data={pageData.entityData} />
    ) : (
      <Topic data={pageData.taxonomyData} />
    )
  const entityId =
    pageData.kind === 'single-entity'
      ? pageData.entityData.id
      : pageData.taxonomyData.id

  return (
    <FrontendClientBase
      noContainers
      entityId={entityId}
      authorization={pageData.authorization}
    >
      <EntityBase page={pageData} entityId={entityId}>
        {page}
      </EntityBase>
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  const alias = (context.params?.slug as string[]).join('/')
  // quite stupid to use fetchPageData here, why not calling requestPage directly?
  const pageData = await requestPage('/' + alias, context.locale! as Instance)

  // we only support theses three kinds - 404 for everything else
  if (
    pageData.kind !== 'taxonomy' &&
    pageData.kind !== 'redirect' &&
    pageData.kind !== 'single-entity'
  ) {
    return { notFound: true }
  }

  await prettifyLinks(pageData)

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugProps['pageData'], // remove undefined values
    },
    revalidate: 60 * 15, // 15 min,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
