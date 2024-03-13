import { gql } from 'graphql-request'
import { useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { InfoPanel } from '@/components/info-panel'
import {
  ManageSubscriptions,
  SubscriptionNode,
} from '@/components/pages/manage-subscriptions'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { cn } from '@/helper/cn'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

const filters = [
  UuidType.Article,
  UuidType.Video,
  UuidType.Applet,
  UuidType.CoursePage,
  UuidType.Exercise,
  UuidType.GroupedExercise,
  UuidType.ExerciseGroup,
  UuidType.User,
  UuidType.Course,
  UuidType.TaxonomyTerm,
]

function Content() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore } = useFetch()
  const [showTypename, setShowTypename] = useState<(typeof filters)[number]>(
    UuidType.Article
  )

  const filtered = data?.nodes.filter(
    (node) => node.object.__typename === showTypename
  )

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return renderNoAuth()
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <>
      {renderTitle(data?.totalCount)}
      {renderLoadMore()}
      <p className="serlo-p">
        {filters.map((typename) => (
          <button
            key={typename}
            onClick={() => setShowTypename(typename)}
            className={cn(
              'mb-2.5 mr-2',
              showTypename === typename
                ? 'serlo-button-blue'
                : 'serlo-button-light'
            )}
          >
            {getEntityStringByTypename(typename, strings)}
          </button>
        ))}
      </p>
      <Guard data={filtered} error={error} needsAuth>
        <>
          <ManageSubscriptions subscriptions={filtered!} />
        </>
      </Guard>
    </>
  )

  function renderLoadMore() {
    if (data === undefined || data?.totalCount === data.nodes.length)
      return null

    return (
      <p className="serlo-p mt-8">
        {replacePlaceholders(loggedInStrings.loadedSentence, {
          loadedCount: data?.nodes.length.toString() || '',
          totalCount: data?.totalCount!.toString() || '',
        })}{' '}
        <a onClick={loadMore} className="serlo-link cursor-pointer">
          {loggedInStrings.loadMoreLink}
        </a>
      </p>
    )
  }

  function renderTitle(totalCount?: number) {
    return (
      <PageTitle
        title={`${strings.pageTitles.subscriptions} (${totalCount || '…'})`}
        headTitle
      />
    )
  }

  function renderNoAuth() {
    return (
      <>
        {renderTitle()}
        <InfoPanel type="info">
          <br />
          <PleaseLogIn />
        </InfoPanel>
      </>
    )
  }
}

function useFetch() {
  return useGraphqlSwrPaginationWithAuth<SubscriptionNode>({
    query: subscriptionsQuery,
    variables: { first: 300 },
    config: {
      refreshInterval: 2 * 60 * 1000, // 2min
    },
    getConnection(data) {
      return (data.subscription as { getSubscriptions: object })
        .getSubscriptions
    },
  })
}

export const subscriptionsQuery = gql`
  query getSubscriptions($first: Int!, $after: String) {
    subscription {
      getSubscriptions(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          sendEmail
          object {
            __typename
            id
            alias
            ... on User {
              username
            }
            ... on TaxonomyTerm {
              type
              name
            }
            ... on Exercise {
              subject {
                taxonomyTerm {
                  name
                }
              }
            }
            ... on ExerciseGroup {
              subject {
                taxonomyTerm {
                  name
                }
              }
            }
            ... on Page {
              currentRevision {
                title
              }
            }
            ... on Article {
              currentRevision {
                title
              }
            }
            ... on Video {
              currentRevision {
                title
              }
            }
            ... on Applet {
              currentRevision {
                title
              }
            }
            ... on CoursePage {
              currentRevision {
                title
              }
            }
            ... on Course {
              currentRevision {
                title
              }
            }
            ... on Event {
              currentRevision {
                title
              }
            }
          }
        }
      }
    }
  }
`
