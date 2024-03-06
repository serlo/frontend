import { GetStaticPaths, GetStaticProps } from 'next'

import { Entity } from '@/components/content/entity'
import { LazyIframeResizer } from '@/components/content/lazy-iframe-resizer'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { Topic } from '@/components/taxonomy/topic'
import { SlugProps } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

// Frontend to support Content-API
// https://github.com/serlo/serlo.org/wiki/Content-API

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
      <Topic
        data={pageData.taxonomyData}
        breadcrumbs={pageData.breadcrumbsData}
      />
    )
  const entityId =
    pageData.kind === 'single-entity'
      ? pageData.entityData.id
      : pageData.taxonomyData.id

  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      entityId={entityId}
      authorization={pageData.authorization}
    >
      <LazyIframeResizer />
      {pageData.metaData ? (
        <HeadTags
          data={pageData.metaData}
          breadcrumbsData={pageData.breadcrumbsData}
          noindex
        />
      ) : null}
      <div className="relative">
        <MaxWidthDiv showNav={!!pageData.secondaryMenuData}>
          <main>{page}</main>
        </MaxWidthDiv>
      </div>
      <style jsx global>
        {`
          body {
            padding-block: 1rem;
          }
          .serlo-user-tools {
            display: none;
          }
        `}
      </style>
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
