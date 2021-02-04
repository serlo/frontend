import { gql } from 'graphql-request'
import { useState } from 'react'
import styled from 'styled-components'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Notifications } from '@/components/pages/user/notifications'
import { StyledP } from '@/components/tags/styled-p'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'
import { NotificationEvent } from '@/components/user/notification'
import { useInstanceData } from '@/contexts/instance-context'
import { makeLightButton, makePrimaryButton } from '@/helper/css'
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
  const { data, error, loadMore, loading } = useNotificationFetch(true)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    data: readData,
    error: readError,
    loadMore: loadMoreRead,
    loading: loadingRead,
  } = useNotificationFetch(false)

  function onMoreRead() {
    loadMoreRead()
  }

  function onTabClick() {
    setShowUnread(!showUnread)
  }

  return (
    <>
      <StyledP>
        {/* //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported*/}
        <TabButton
          active={showUnread}
          onPointerUp={(e) => e.currentTarget.blur()}
          onClick={onTabClick}
        >
          Show new (<UnreadNotificationsCount onlyNumber />)
        </TabButton>
        <TabButton
          active={!showUnread}
          onPointerUp={(e) => e.currentTarget.blur()}
          onClick={onTabClick}
        >
          Show read
        </TabButton>
      </StyledP>
      {showUnread ? (
        <Guard data={data} error={error} needsAuth>
          <Notifications
            data={data!}
            isLoading={loading}
            loadMore={loadMore}
            isUnread
          />
        </Guard>
      ) : (
        <Guard data={readData} error={readError} needsAuth>
          <Notifications
            data={readData!}
            isLoading={loadingRead}
            loadMore={onMoreRead}
          />
        </Guard>
      )}
    </>
  )
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.notifications} headTitle />
}

const TabButton = styled.button<{ active: boolean }>`
  ${(props) => (props.active ? makePrimaryButton : makeLightButton)}
  margin-right: 20px;
  margin-bottom: 20px;
`

export function useNotificationFetch(unread?: boolean) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrPaginationWithAuth<{
    id: number
    event: NotificationEvent
    unread: boolean
  }>({
    query,
    variables: {
      first: 10,
      unread,
    },
    getConnection(data) {
      return data.notifications
    },
  })
}

const query = gql`
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
            activeAuthor
            activeDonor
            activeReviewer
          }
          objectId
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
`
