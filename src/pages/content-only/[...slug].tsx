import { GetStaticPaths, GetStaticProps } from 'next'

import { Entity } from '@/components/content/entity'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { Topic } from '@/components/taxonomy/topic'
import { SlugProps } from '@/data-types'
import { prettifyLinks } from '@/fetcher/prettify-links'
import { Instance } from '@/fetcher/query-types'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

// Fontend to support Content-API
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
      <Topic data={pageData.taxonomyData} />
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
      {pageData.metaData && (
        <HeadTags
          data={pageData.metaData}
          breadcrumbsData={pageData.breadcrumbsData}
          noindex
        />
      )}
      <div className="relative">
        <MaxWidthDiv showNav={!!pageData.secondaryNavigationData}>
          <main>{page}</main>
        </MaxWidthDiv>
      </div>
      <style jsx global>
        {`
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
