import { gql } from 'graphql-request'
import React from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { useAuth } from '@/auth/use-auth'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingError } from '@/components/loading/loading-error'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Notifications } from '@/components/pages/user/notifications'
import { NotificationEvent } from '@/components/user/notification'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { shouldUseNewAuth } from '@/helper/feature-auth'

export default function Page() {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <FrontendClientBase>
      <Content />
    </FrontendClientBase>
  )
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

function Content() {
  const auth = useAuth()
  const { strings } = useInstanceData()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useGraphqlSwrPaginationWithAuth<{
    id: number
    event: NotificationEvent
    unread: boolean
  }>({
    query,
    variables: {
      first: 10,
      unread: undefined,
    },
    getConnection(data) {
      return data.notifications
    },
  })

  function loadMoreAction() {
    loadMore()
  }

  const output =
    auth.current === null ? (
      <PleaseLogIn />
    ) : !data ? (
      <LoadingSpinner noText />
    ) : error !== undefined ? (
      <LoadingError error={error} />
    ) : (
      <Notifications
        data={data}
        isLoading={loading}
        loadMore={loadMoreAction}
      />
    )

  return (
    <>
      <PageTitle title={strings.pageTitles.notifications} headTitle />
      {output}
    </>
  )
}
