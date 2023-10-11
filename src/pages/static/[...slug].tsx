import { GetStaticPaths, GetStaticProps } from 'next'

import { StaticEntity } from '@/components/content/static-entity'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { StaticTaxonomy } from '@/components/taxonomy/static-taxonomy'
import { SlugProps } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { staticRequestPage } from '@/fetcher/static-request-page'
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
      <StaticEntity data={pageData.entityData} />
    ) : (
      <StaticTaxonomy data={pageData.taxonomyData} />
    )
  const entityId =
    pageData.kind === 'single-entity'
      ? pageData.entityData.id
      : pageData.taxonomyData.id

  const revisionId =
    pageData.kind === 'single-entity'
      ? pageData.entityData.revisionId
      : undefined

  return (
    <FrontendClientBase
      noContainers
      entityId={entityId}
      revisionId={revisionId}
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
  const pageData = await staticRequestPage(
    '/' + alias,
    context.locale! as Instance
  )

  // we only support theses three kinds - 404 for everything else
  if (
    pageData.kind !== 'taxonomy' &&
    pageData.kind !== 'redirect' &&
    pageData.kind !== 'single-entity'
  ) {
    return { notFound: true }
  }

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
