import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { FaIcon } from '@/components/fa-icon'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Event } from '@/components/user/event'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { GetNotificationsQuery } from '@/fetcher/graphql-types/operations'
import { useSetNotificationStateMutation } from '@/mutations/use-set-notification-state-mutation'
import { useSubscriptionSetMutation } from '@/mutations/use-subscription-set-mutation'

interface NotificationProps {
  data: GetNotificationsQuery['notifications']
  loadMore: () => void
  isLoading: boolean
}

export const Notifications = ({
  data,
  loadMore,
  isLoading,
}: NotificationProps) => {
  const auth = useAuthentication()
  const setNotificationToRead = useSetNotificationStateMutation()
  const setSubscription = useSubscriptionSetMutation()
  const [hidden, setHidden] = useState<number[]>([])

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.notifications

  return (
    <>
      {renderNotifications(data.nodes)}
      {isLoading && <LoadingSpinner text={strings.loading.isLoading} />}
      {data.pageInfo.hasNextPage && !isLoading ? (
        <div className="flex justify-between">
          <button className="serlo-button-blue mb-12 mt-5" onClick={loadMore}>
            {strings.actions.loadMore}
          </button>
          {data.nodes[0]?.unread && (
            <button
              className="serlo-button-light mb-12 mt-5"
              onClick={setAllToRead}
            >
              <FaIcon icon={faCheck} /> {loggedInStrings.setAllToRead}
            </button>
          )}
        </div>
      ) : null}
    </>
  )

  function renderNotifications(nodes: NotificationProps['data']['nodes']) {
    return nodes.map((node) => {
      if (hidden.includes(node.id)) return null
      if (!node.event) return <p className="serlo-p">Error</p>
      return (
        <Event
          key={node.id}
          eventId={node.id}
          event={node.event}
          unread={node.unread}
          loggedInStrings={loggedInStrings}
          setToRead={setToRead}
          mute={mute}
        />
      )
    })
  }

  function setToRead(id: number) {
    void setNotificationToRead({
      id: [id],
      unread: false,
    })
    // hide immediately
    setHidden([...hidden, id])
  }

  function mute(id: number) {
    void setSubscription({ id: [id], subscribe: false, sendEmail: false })
  }

  function setAllToRead() {
    if (auth === null) return

    const unreadIds = data?.nodes.flatMap((node) =>
      node.unread ? [node.id] : []
    )
    void setNotificationToRead({
      id: unreadIds,
      unread: false,
    })
  }
}
