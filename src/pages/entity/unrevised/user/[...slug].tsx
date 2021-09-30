import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ErrorPage } from '@/components/pages/error-page'
import { UserUnrevisedRevisions } from '@/components/user/user-unrevised-revisions'
import { SlugPageData, SlugProps } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  if (
    pageData.kind === 'user/events' // reusing event page type
  ) {
    const data = pageData.userData

    return (
      <FrontendClientBase>
        <Content userId={data.id} alias={data.alias} />
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
            : 'not supported'
        }
      />
    </FrontendClientBase>
  )
})

function Content({ userId, alias }: { userId: number; alias?: string }) {
  const label = alias?.split('/')[3]
  const url = alias ? alias : `/${userId}`

  return (
    <>
      {label && <Breadcrumbs data={[{ label, url }]} asBackButton />}
      <UserUnrevisedRevisions userId={userId} alias={alias} />
    </>
  )
}

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  const alias = (context.params?.slug as string[]).join('/')
  // reusing fetchPageData here, it loads too much data, but the request is most likely cached already
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
