import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Query } from '@serlo/api'
import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'
import { NotificationEvent, Notification } from '@/components/user/notification'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { inputFontReset, makeDefaultButton } from '@/helper/css'
import { shouldUseNewAuth } from '@/helper/feature-auth'

const titleNoPageQueryPart = /* GraphQL */ `
... on Applet {
  currentRevision {
    title
  }
}
... on Article {
  currentRevision {
    title
  }
}
... on Course {
  currentRevision {
    title
  }
}
... on CoursePage {
  currentRevision {
    title
  }
}
... on Video {
  currentRevision {
    title
  }
}
`
const titleQueryPart =
  titleNoPageQueryPart +
  /* GraphQL */ `
... on Page {
  currentRevision {
    title
  }
}`

interface PreviousNotificationsData {
  notifications: JSX.Element[]
  offset: string | undefined | null
}

export const Notifications: NextPage = () => {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())
  const [previousNotifications, setPreviousNotifications] = React.useState<
    PreviousNotificationsData
  >({
    notifications: [],
    offset: undefined,
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()

  const response = useGraphqlSwr<Query>({
    query: /* GraphQL */ `
      query notifications($count: Int!, $unread: Boolean, $after: String){
        notifications(first: $count, unread: $unread, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            unread
            event {
              date
              __typename
              actor {
                id
                username
              }
              ... on CheckoutRevisionNotificationEvent {
                revision {
                  id
                }
                repository {
                  id
                  ${titleQueryPart}
                  __typename
                }
                reason
              }
              ... on CreateCommentNotificationEvent {
                comment {
                  id
                }
                thread {
                  id
                }
              }
              ... on CreateEntityNotificationEvent {
                entity {
                  id
                }
              }
              ... on CreateEntityLinkNotificationEvent {
                parent {
                  id
                }
                child {
                  id
                }
              }
              ... on CreateEntityRevisionNotificationEvent {
                entityRevision {
                  id
                }
                entity {
                  id
                  ${titleNoPageQueryPart}
                  __typename
                }
              }
              ... on CreateTaxonomyTermNotificationEvent {
                taxonomyTerm {
                  id
                }
              }
              ... on CreateTaxonomyLinkNotificationEvent {
                child {
                  id
                  ${titleQueryPart}
                  __typename
                }
                parent {
                  id
                  name
                }
              }
              ... on CreateThreadNotificationEvent {
                thread {
                  id
                }
                object {
                  id
                  ${titleQueryPart}
                  __typename
                }
              }
              ... on RejectRevisionNotificationEvent {
                repository {
                  id
                }
                revision {
                  id
                }
                reason
              }
              ... on RemoveEntityLinkNotificationEvent {
                parent {
                  id
                }
                child {
                  id
                }
              }
              ... on RemoveTaxonomyLinkNotificationEvent {
                child {
                  id
                  ${titleQueryPart}
                  __typename
                }
                parent {
                  id
                  name
                }
              }
              ... on SetLicenseNotificationEvent {
                repository {
                  id
                  ${titleQueryPart}
                  __typename
                }
              }
              ... on SetTaxonomyParentNotificationEvent {
                child {
                  id
                }
                previousParent {
                  id
                }
              }
              ... on SetTaxonomyTermNotificationEvent {
                taxonomyTerm {
                  id
                }
              }
              ... on SetThreadStateNotificationEvent {
                archived
                thread {
                  id
                }
              }
              ... on SetUuidStateNotificationEvent {
                object {
                  id
                  ${titleQueryPart}
                  __typename
                }
                trashed
              }
            }
          }
        }
      }
    `,
    variables: {
      count: 10,
      unread: undefined,
      after: previousNotifications.offset,
    },
  })
  const { data } = response

  if (!mounted) return null

  if (
    !loggedInData ||
    (response.error && (response.error as Error).message === 'unauthorized')
  )
    return renderUnauthorized()

  const loggedInStrings = loggedInData.strings.notifications

  const notifications =
    data &&
    data.notifications.nodes.map((node) => {
      return (
        <Notification
          key={node.id}
          event={node.event as NotificationEvent}
          unread={node.unread}
          loggedInStrings={loggedInStrings}
        />
      )
    })

  const allNotifications = notifications
    ? previousNotifications.notifications.concat(notifications)
    : previousNotifications.notifications

  function loadMore() {
    setPreviousNotifications({
      notifications: allNotifications,
      offset: data!.notifications.pageInfo.endCursor,
    })
  }

  const isLoading =
    allNotifications.length === 0 ||
    allNotifications.length === previousNotifications.notifications.length

  return wrapInContainer(
    <>
      {allNotifications}
      {response.error && renderUnknownError()}
      {isLoading && renderLoading()}
      {data?.notifications.pageInfo.hasNextPage && (
        <Button onClick={loadMore}>{loggedInStrings.loadMore}</Button>
      )}
    </>
  )

  function wrapInContainer(children: JSX.Element) {
    return (
      <RelativeContainer>
        <MaxWidthDiv showNav>
          <main>
            <StyledH1 extraMarginTop>
              {strings.notifications.notifications}
            </StyledH1>
            <Wrapper>{children}</Wrapper>
          </main>
        </MaxWidthDiv>
      </RelativeContainer>
    )
  }

  function renderUnauthorized() {
    console.log(response.error)

    return wrapInContainer(
      <>
        <StyledP>
          <Link href="/api/auth/login">
            {strings.notifications.pleaseLogInLink}
          </Link>{' '}
          {strings.notifications.pleaseLogInText}
        </StyledP>
      </>
    )
  }

  function renderUnknownError() {
    console.log(response.error)
    return wrapInContainer(
      <>
        <StyledP>{loggedInStrings.unknownProblem}</StyledP>
      </>
    )
  }

  function renderLoading() {
    return (
      <StyledP style={{ marginTop: '50px' }}>
        <ColoredIcon>
          <FontAwesomeIcon icon={faSpinner} spin size="1x" />
        </ColoredIcon>{' '}
        {loggedInStrings.loading}
      </StyledP>
    )
  }
}

const ColoredIcon = styled.span`
  color: ${(props) => props.theme.colors.brand};
`

const Wrapper = styled.div`
  margin-bottom: 80px;
`

const Button = styled.button`
  ${inputFontReset}
  ${makeDefaultButton}
  margin-top: 40px;
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.brand};
  color: #fff;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightblue};
  }
`
