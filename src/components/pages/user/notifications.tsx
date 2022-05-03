import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { PageInfo } from '@serlo/api'
import { useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { FaIcon } from '@/components/fa-icon'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Event, EventData } from '@/components/user/event'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { useSetNotificationStateMutation } from '@/helper/mutations/use-set-notification-state-mutation'

export interface NotificationData {
  id: number
  event: EventData
  unread: boolean
}

interface NotificationProps {
  data: {
    nodes: NotificationData[]
    pageInfo: PageInfo
  }
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
          <button
            className="serlo-button serlo-make-interactive-primary mt-5 mb-12"
            onClick={loadMore}
          >
            {strings.actions.loadMore}
          </button>
          {data.nodes[0]?.unread && (
            <button
              className="serlo-button serlo-make-interactive-light mt-5 mb-12"
              onClick={setAllToRead}
            >
              <FaIcon icon={faCheck} /> {loggedInStrings.setAllToRead}
            </button>
          )}
        </div>
      ) : null}
    </>
  )

  function renderNotifications(nodes: NotificationData[]) {
    return nodes.map((node) => {
      if (hidden.includes(node.id)) return null
      return (
        <Event
          key={node.id}
          eventId={node.id}
          event={node.event}
          unread={node.unread}
          loggedInStrings={loggedInStrings}
          setToRead={setToRead}
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

  function setAllToRead() {
    if (auth.current === null) return

    const unreadIds = data?.nodes.flatMap((node) =>
      node.unread ? [node.id] : []
    )
    void setNotificationToRead({
      id: unreadIds,
      unread: false,
    })
  }
}
