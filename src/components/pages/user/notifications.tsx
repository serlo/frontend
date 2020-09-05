import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gql } from 'graphql-request'
import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

import { useGraphqlSwrPagination } from '@/api/use-graphql-swr'
import { Link } from '@/components/content/link'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'
import { Notification, NotificationEvent } from '@/components/user/notification'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { makePrimaryButton } from '@/helper/css'
import { shouldUseNewAuth } from '@/helper/feature-auth'

export const Notifications: NextPage = () => {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()

  const response = useGraphqlSwrPagination<{
    id: number
    event: NotificationEvent
    unread: boolean
  }>({
    query: gql`
      query notifications($first: Int!, $unread: Boolean, $after: String) {
        notifications(first: $first, unread: $unread, after: $after) {
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
                  ...withTitle
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
                  ...withTitle
                }
              }
              ... on CreateTaxonomyTermNotificationEvent {
                taxonomyTerm {
                  id
                }
              }
              ... on CreateTaxonomyLinkNotificationEvent {
                child {
                  ...withTitle
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
                  ...withTitle
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
                  ...withTitle
                }
                parent {
                  id
                  name
                }
              }
              ... on SetLicenseNotificationEvent {
                repository {
                  ...withTitle
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
                  ...withTitle
                }
                trashed
              }
            }
          }
        }
      }

      fragment withTitle on AbstractUuid {
        __typename
        id

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
        ... on Page {
          currentRevision {
            title
          }
        }
      }
    `,
    variables: {
      first: 10,
      unread: undefined,
    },
    getConnection(data) {
      return data.notifications
    },
  })

  if (!mounted) return null

  if (!loggedInData || response.error?.message === 'unauthorized')
    return renderUnauthorized()

  const loggedInStrings = loggedInData.strings.notifications

  const notifications = response.data?.nodes.map((node) => {
    return (
      <Notification
        key={node.id}
        event={node.event}
        unread={node.unread}
        loggedInStrings={loggedInStrings}
      />
    )
  })

  const isLoading = response.loading

  return wrapInContainer(
    <>
      {notifications}
      {response.error && renderUnknownError()}
      {isLoading && renderLoading()}
      {response.data?.pageInfo.hasNextPage && !isLoading ? (
        <Button
          onClick={() => {
            response.loadMore()
          }}
        >
          {loggedInStrings.loadMore}
        </Button>
      ) : null}
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
  ${makePrimaryButton}
  margin-top: 40px;
`
