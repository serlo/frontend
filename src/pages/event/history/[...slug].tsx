import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Events } from '@/components/user/events'
import { UserUnrevisedRevisions } from '@/components/user/user-unrevised-revisions'
import { useInstanceData } from '@/contexts/instance-context'
import { EventHistoryProps } from '@/data-types'
import { Instance } from '@/fetcher/query-types'
import { requestPage } from '@/fetcher/request-page'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<EventHistoryProps>(({ pageData }) => {
  return (
    <FrontendClientBase>
      <Content
        title={pageData.title}
        id={pageData.id}
        alias={pageData.alias}
        isUser={pageData.isUser}
      />
    </FrontendClientBase>
  )
})

function Content({ title, id, alias, isUser }: EventHistoryProps['pageData']) {
  const { strings } = useInstanceData()

  const auth = useAuthentication()
  const [isOwn, setIsOwn] = useState(false)

  useEffect(() => {
    if (!isUser) return
    setIsOwn(auth.current?.id === id)
  }, [auth, isUser, id])

  const hasTitle = title && title.length > 1
  const label = hasTitle ? title : strings.revisions.toContent
  const url = alias ? alias : id ? `/${id}` : undefined

  const anyUserString = strings.pageTitles.userEdits.replace(
    '%user%',
    title ?? ''
  )

  const titleString = isUser
    ? isOwn
      ? strings.pageTitles.userEditsMine
      : anyUserString
    : strings.pageTitles.eventLog + (hasTitle ? ' – ' + title : '')

  return (
    <>
      <Breadcrumbs data={[{ label, url }]} asBackButton />
      <PageTitle title={titleString} headTitle />

      {renderEvents()}
    </>
  )

  function renderEvents() {
    return (
      <>
        {isUser && renderEdits()}
        <h2 className="serlo-h3" id="activities">
          {strings.eventLog.currentEvents}
        </h2>
        <Events
          objectId={isUser ? undefined : id}
          userId={isUser ? id : undefined}
          perPage={10}
          moreButton
        />
      </>
    )

    function renderEdits() {
      return <UserUnrevisedRevisions userId={id} alias={alias} isOwn={isOwn} />
    }
  }
}

export const getStaticProps: GetStaticProps<EventHistoryProps> = async (
  context
) => {
  const alias = (context.params?.slug as string[]).join('/')

  const pageData = await requestPage('/' + alias, context.locale! as Instance)

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

    return {
      props: {
        pageData: {
          id: data.id,
          title: data.title ?? '',
          alias,
          isUser: pageData.kind === 'user/events',
        },
      },
      revalidate: 1,
    }
  }

  return { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
