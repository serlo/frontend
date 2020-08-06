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
import { Notification } from '@/components/user/notification'
import { shouldUseNewAuth } from '@/helper/feature-auth'

const titleHelper = `
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
... on Page {
  currentRevision {
    title
  }
}
... on Video {
  currentRevision {
    title
  }
}`

export const Notifications: NextPage = () => {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())

  const { data } = useGraphqlSwr<Query>({
    query: `
      query notifications($count: Int!, $unread: Boolean){
        notifications(first: $count, unread: $unread) {
          nodes {
            id
            unread
            event {
              date
              __typename
              ... on CheckoutRevisionNotificationEvent {
                reviewer {
                  id
                  username
                }
                revision {
                  id
                }
                repository {
                  id
                  ${titleHelper}
                }
                reason
              }
              ... on CreateCommentNotificationEvent {
                author {
                  id
                  username
                }
                comment {
                  id
                }
                thread {
                  id
                }
              }
              ... on CreateEntityNotificationEvent {
                date
                author {
                  id
                  username
                }
                entity {
                  id
                  alias
                }
              }
              ... on CreateEntityLinkNotificationEvent {
                actor {
                  id
                  username
                }
                parent {
                  id
                }
                child {
                  id
                }
              }
              ... on CreateEntityRevisionNotificationEvent {
                author {
                  id
                  username
                }
                entityRevision {
                  id
                }
                entity {
                  id
                }
              }
              ... on CreateTaxonomyTermNotificationEvent {
                author {
                  id
                  username
                }
                taxonomyTerm {
                  id
                }
              }
              ... on CreateTaxonomyLinkNotificationEvent {
                actor {
                  id
                  username
                }
                child {
                  id
                }
                parent {
                  id
                }
              }
              ... on CreateThreadNotificationEvent {
                date
                author {
                  id
                  username
                }
                thread {
                  id
                }
                object {
                  id
                }
              }
              ... on RejectRevisionNotificationEvent {
                reviewer {
                  id
                  username
                }
                repository {
                  id
                }
                revision {
                  id
                }
                reason
              }
              ... on RemoveEntityLinkNotificationEvent {
                actor {
                  id
                  username
                }
                parent {
                  id
                }
                child {
                  id
                }
              }
              ... on RemoveTaxonomyLinkNotificationEvent {
                actor {
                  id
                  username
                }
                child {
                  id
                }
                parent {
                  id
                }
              }
              ... on SetLicenseNotificationEvent {
                date
                actor {
                  id
                  username
                }
                repository {
                  id
                  alias
                }
              }
              ... on SetTaxonomyParentNotificationEvent {
                actor {
                  id
                  username
                }
                child {
                  id
                }
                previousParent {
                  id
                }
              }
              ... on SetTaxonomyTermNotificationEvent {
                author {
                  id
                  username
                }
                taxonomyTerm {
                  id
                }
              }
              ... on SetThreadStateNotificationEvent {
                actor {
                  id
                  username
                }
                archived
                thread {
                  id
                }
              }
              ... on SetUuidStateNotificationEvent {
                actor {
                  id
                  username
                }
                object {
                  id
                }
                trashed
              }
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

  if (!mounted) return null

  return (
    <RelativeContainer>
      <MaxWidthDiv showNav>
        <main>
          <StyledH1 extraMarginTop>Benachrichtigungen</StyledH1>
          <Wrapper>
            {data ? (
              data.notifications.nodes.map((node) => {
                return (
                  <Notification
                    key={node.id}
                    event={node.event}
                    unread={node.unread}
                  />
                )
              })
            ) : (
              <StyledP>
                Bitte <Link href="/api/auth/login">melde dich an</Link> um deine
                Benachrichtigungen zu sehen
              </StyledP>
            )}
          </Wrapper>
        </main>
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

const Wrapper = styled.div`
  margin-bottom: 80px;
`
