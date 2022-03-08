import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
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
      <ErrorPage code={404} />
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
