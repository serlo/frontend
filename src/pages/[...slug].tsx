import { GetStaticPaths, GetStaticProps } from 'next'

import { Entity } from '@/components/content/entity'
import { Topic } from '@/components/content/topic'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { ErrorPage } from '@/components/pages/error-page'
import { SlugProps, SlugPageData } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  if (pageData === undefined) return <ErrorPage code={404} />

  //fallback, should be handled by CFWorker
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

  if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy') {
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
        <EntityBase page={pageData}>{page}</EntityBase>
      </FrontendClientBase>
    )
  }

  return (
    <FrontendClientBase>
      <ErrorPage
        code={pageData.kind === 'error' ? pageData.errorData.code : 400}
        message={
          pageData.kind === 'error'
            ? pageData.errorData.message
            : 'unsupported type'
        }
      />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  const alias = (context.params?.slug as string[]).join('/')
  const pageData = await fetchPageData('/' + context.locale! + '/' + alias)
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SlugPageData, // remove undefined values
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
