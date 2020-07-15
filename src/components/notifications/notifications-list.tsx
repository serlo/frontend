import styled, { css } from 'styled-components'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
//TODO: investigate
// eslint-disable-next-line import/no-internal-modules
import de from 'timeago.js/lib/lang/de'

import { Notification } from './notification'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import {
  NotificationEventPayload,
  parseNotificationEvent,
} from '@/events/event'

// register it.
timeago.register('de', de)

export function NotificationsList() {
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

  return (
    <Wrapper>
      {data?.notifications.nodes.map((node) => {
        const props = {
          ...node,
          event: parseNotificationEvent(node.event),
        }

        const eventDate = new Date(node.event.date)

        return (
          <Item read={!node.unread} key={node.id}>
            <Body>
              <Notification {...props} />
            </Body>
            <span title={eventDate.toLocaleString('de-DE')}>
              <StyledTimeAgo
                datetime={eventDate}
                locale="de"
                opts={{ minInterval: 60 }}
              />
            </span>
          </Item>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 50px 0;
`

const StyledTimeAgo = styled(TimeAgo)`
  color: ${(props) => props.theme.colors.gray};
  margin-left: 5px;
`

const Item = styled.div<{ read: boolean }>`
  margin: 10px 0;
  padding: 24px;
  &:nth-child(even) {
    background: ${(props) => props.theme.colors.bluewhite};
  }
  ${(props) =>
    props.read
      ? ''
      : css`
          font-weight: 600;
          &:before {
            content: '';
            display: inline-block;
            background: ${props.theme.colors.brand};
            border-radius: 50%;
            width: 10px;
            height: 10px;
            margin-right: 7px;
          }
        `}
`

const Body = styled.span`
  a {
    color: ${(props) => props.theme.colors.brand};
    text-decoration: none;
  }
  a:hover {
    color: ${(props) => props.theme.colors.lightblue};
  }
`
