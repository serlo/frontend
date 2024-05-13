import { GetStaticPaths, GetStaticProps } from 'next'

import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Events } from '@/components/user/events'
import { useInstanceData } from '@/contexts/instance-context'
import { EventHistoryProps } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<EventHistoryProps>(({ pageData }) => {
  return (
    <FrontendClientBase>
      <Content {...pageData} />
    </FrontendClientBase>
  )
})

function Content({ title, id, alias }: EventHistoryProps['pageData']) {
  const { strings } = useInstanceData()

  const label = title.length ? title : strings.revisions.toContent
  const titleString = `${strings.pageTitles.eventLog}${title.length ? ' – ' + title : ''}`

  return (
    <>
      <Breadcrumbs data={[{ label, url: alias }]} asBackButton />
      <PageTitle title={titleString} headTitle />
      <h2 className="serlo-h3" id="activities">
        {strings.eventLog.currentEvents}
      </h2>
      <Events objectId={id} perPage={10} moreButton />
    </>
  )
}

export const getStaticProps: GetStaticProps<EventHistoryProps> = async (
  context
) => {
  const alias = (context.params?.slug as string[]).join('/')

  const pageData = await requestPage('/' + alias, context.locale! as Instance)

  if (pageData.kind !== 'single-entity' && pageData.kind !== 'taxonomy') {
    return { notFound: true }
  }

  const { id, title = '' } =
    pageData.kind === 'single-entity'
      ? pageData.entityData
      : pageData.taxonomyData

  return {
    props: { pageData: { id, title, alias } },
    revalidate: 60, // 1 min
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
