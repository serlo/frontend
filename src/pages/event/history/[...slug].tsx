import { GetStaticPaths, GetStaticProps } from 'next'

import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ErrorPage } from '@/components/pages/error-page'
import { Events } from '@/components/user/events'
import { useInstanceData } from '@/contexts/instance-context'
import { SlugPageData, SlugProps } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
  if (pageData === undefined) return <ErrorPage code={404} />

  if (
    pageData.kind === 'single-entity' ||
    pageData.kind === 'taxonomy' ||
    pageData.kind === 'user/events'
  ) {
    const data =
      pageData.kind === 'single-entity'
        ? pageData.entityData
        : pageData.kind === 'taxonomy'
        ? pageData.taxonomyData
        : pageData.userData

    return (
      <FrontendClientBase>
        <Content
          title={data.title}
          id={data.id}
          alias={data.alias}
          isUser={pageData.kind === 'user/events'}
        />
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

function Content({
  title,
  id,
  alias,
  isUser,
}: {
  title?: string
  id: number
  alias?: string
  isUser?: boolean
}) {
  const { strings } = useInstanceData()
  const label = title && title !== '' ? title : strings.revisions.toContent
  const url = alias ? alias : id ? `/${id}` : undefined

  return (
    <>
      <Breadcrumbs data={[{ label, url }]} asBackButton />
      <Title />
      <Events
        objectId={isUser ? undefined : id}
        userId={isUser ? id : undefined}
        perPage={10}
        moreButton
      />
    </>
  )
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.eventLog} headTitle />
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
