import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageInfo } from '@serlo/api'
import { useState } from 'react'
import styled from 'styled-components'

import { useAuthentication } from '@/auth/use-authentication'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Notification, NotificationEvent } from '@/components/user/notification'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { makeLightButton, makeMargin, makePrimaryButton } from '@/helper/css'
import { useSetNotificationStateMutation } from '@/helper/mutations'

interface NotificationData {
  id: number
  event: NotificationEvent
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
      {data?.pageInfo.hasNextPage && !isLoading ? (
        <ButtonWrap>
          <Button onClick={() => loadMore()}>{loggedInStrings.loadMore}</Button>
          <LightButton onClick={() => setAllToRead()}>
            <FontAwesomeIcon icon={faCheck} /> {loggedInStrings.setAllToRead}
          </LightButton>
        </ButtonWrap>
      ) : null}
    </>
  )

  function renderNotifications(nodes: NotificationData[]) {
    return nodes.map((node) => {
      if (hidden.includes(node.id)) return null
      return (
        <Notification
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

const Button = styled.button`
  ${makePrimaryButton}
  ${makeMargin}
  margin-top: 20px;
  margin-bottom: 50px;
`

const LightButton = styled.button`
  ${makeLightButton}
  ${makeMargin}
  margin-top: 20px;
  margin-bottom: 50px;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`
