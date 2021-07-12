import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { SubscriptionData } from '@/data-types'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

const filters = [
  'Article',
  'Video',
  'Applet',
  'CoursePage',
  'Exercise',
  'GroupedExercise',
  'ExerciseGroup',
  'Solution',
  'User',
  'Course',
  'TaxonomyTerm',
]

function Content() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore } = useFetch()
  const [showTypename, setShowTypename] =
    useState<typeof filters[number]>('Article')

  const filtered = data?.nodes.filter(
    (node) => node.object.__typename === showTypename
  )

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <>
      {renderTitle(data?.totalCount)}
      {renderLoadMore()}
      <p className="serlo-p">
        {/* //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported*/}
        {filters.map((typename) => (
          <button
            key={typename}
            onPointerUp={(e) => e.currentTarget.blur()}
            onClick={() => setShowTypename(typename)}
            className={clsx(
              'serlo-button mr-2 mb-2.5',
              showTypename == typename
                ? 'serlo-make-interactive-primary'
                : 'serlo-make-interactive-light'
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
}

function useFetch() {
  return useGraphqlSwrPaginationWithAuth<SubscriptionData>({
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
  query subscription($first: Int!, $after: String) {
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
              taxonomyTerms {
                nodes {
                  navigation {
                    path {
                      nodes {
                        label
                      }
                    }
                  }
                }
              }
            }
            ... on ExerciseGroup {
              taxonomyTerms {
                nodes {
                  navigation {
                    path {
                      nodes {
                        label
                      }
                    }
                  }
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
