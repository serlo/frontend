import { gql } from 'graphql-request'
import { useState, ReactNode } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { Notifications } from '@/components/pages/user/notifications'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { GetNotificationsQuery } from '@/fetcher/graphql-types/operations'
import { sharedEventFragments } from '@/fetcher/query-fragments'
import { cn } from '@/helper/cn'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Title />
    <Content />
  </FrontendClientBase>
))

function Content() {
  const [showUnread, setShowUnread] = useState(true)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useNotificationFetch(showUnread)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  const { showNew, showRead } = loggedInData.strings.notifications

  return (
    <>
      <p className="serlo-p">
        <TabButton setShowUnreadTo>
          {showNew} (<UnreadNotificationsCount onlyNumber />)
        </TabButton>
        <TabButton setShowUnreadTo={false}>{showRead}</TabButton>
      </p>
      <Guard data={data} error={error} needsAuth>
        <Notifications data={data!} isLoading={loading} loadMore={loadMore} />
      </Guard>
    </>
  )

  function TabButton({
    setShowUnreadTo,
    children,
  }: {
    setShowUnreadTo: boolean
    children: ReactNode
  }) {
    return (
      <button
        className={cn(
          'mb-5 mr-5',
          showUnread === setShowUnreadTo
            ? 'serlo-button-blue'
            : 'serlo-button-light'
        )}
        onClick={() => setShowUnread(setShowUnreadTo)}
      >
        {children}
      </button>
    )
  }
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.notifications} headTitle />
}

function useNotificationFetch(unread: boolean) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrPaginationWithAuth<
    GetNotificationsQuery['notifications']['nodes'][number]
  >({
    query: notificationsQuery,
    variables: { first: 10, unread },
    config: {
      refreshInterval: 10 * 1000, // seconds
    },
    getConnection(data) {
      return data.notifications
    },
  })
}

const notificationsQuery = gql`
  query getNotifications($first: Int!, $unread: Boolean, $after: String) {
    notifications(first: $first, unread: $unread, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        unread
        event {
          ...eventData
        }
      }
    }
  }

  ${sharedEventFragments}
`
