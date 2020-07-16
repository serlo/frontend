import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { Notification } from '@/components/user/notification'
import {
  NotificationEventPayload,
  parseNotificationEvent,
} from '@/events/event'
import { shouldUseNewAuth } from '@/helper/feature-auth'

export const Notifications: NextPage = () => {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())

  const { data } = useGraphqlSwr<{
    notifications: {
      nodes: {
        id: number
        unread: boolean
        event: NotificationEventPayload
      }[]
    }
  }>({
    query: `
      query notifications($count: Int!, $unread: Boolean){
        notifications(first: $count, unread: $unread) {
          nodes {
            id
            unread
            event {
              type
              date
              actor {
                id
                username
              }
              object {
                id
              }
              payload
            }
          }
        }
      }
    `,
    variables: {
      // TODO: set number of items to show. We could add pagination in a later iteration
      count: 20,
      // TODO: can be true | false | undefined. If defined, it will only return notifications that have the corresponding unread state.
      unread: undefined,
    },
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <RelativeContainer>
      <MaxWidthDiv showNav>
        <main>
          <StyledH1 extraMarginTop>Benachrichtigungen</StyledH1>
          <Wrapper>
            {data?.notifications.nodes.map((node) => {
              const event = parseNotificationEvent(node.event)
              return (
                <Notification
                  key={node.id}
                  event={event}
                  unread={node.unread}
                />
              )
            })}
          </Wrapper>
        </main>
      </MaxWidthDiv>
    </RelativeContainer>
  ) : null
}

const Wrapper = styled.div`
  margin-bottom: 80px;
`
