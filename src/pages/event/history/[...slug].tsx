import { GetStaticPaths, GetStaticProps } from 'next'

import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ErrorPage } from '@/components/pages/error-page'
import { Events } from '@/components/user/events'
import { UserUnrevisedRevisions } from '@/components/user/user-unrevised-revisions'
import { useInstanceData } from '@/contexts/instance-context'
import { SlugPageData, SlugProps } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<SlugProps>(({ pageData }) => {
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
            : 'not supported'
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

  const hasTitle = title && title.length > 1
  const label = hasTitle ? title : strings.revisions.toContent
  const url = alias ? alias : id ? `/${id}` : undefined
  const titleString =
    strings.pageTitles.eventLog + (hasTitle ? ' – ' + title : '')

  return (
    <>
      <Breadcrumbs data={[{ label, url }]} asBackButton />
      <PageTitle title={titleString} headTitle />

      {isUser && renderUnrevisedRevisions()}
      {renderEvents()}
    </>
  )

  function renderUnrevisedRevisions() {
    return (
      <>
        <UserUnrevisedRevisions userId={id} />
      </>
    )
  }

  function renderEvents() {
    return (
      <>
        <h3 className="serlo-h3">{strings.eventLog.currentEvents}</h3>
        <Events
          objectId={isUser ? undefined : id}
          userId={isUser ? id : undefined}
          perPage={10}
          moreButton
        />
      </>
    )
  }
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
