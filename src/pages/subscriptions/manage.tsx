import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'
import { useInstanceData } from '@/contexts/instance-context'
import { QueryResponse } from '@/fetcher/query-types'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Title />
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
  const response = useFetch()
  const { strings } = useInstanceData()
  const [showTypename, setShowTypename] =
    useState<typeof filters[number]>('Article')

  const filtered = response.data?.subscriptions.nodes.filter(
    (node) => node.__typename === showTypename
  )

  return (
    <>
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
      <Guard {...response} needsAuth>
        <ManageSubscriptions subscriptions={filtered!} />
      </Guard>
    </>
  )
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.subscriptions} headTitle />
}

function useFetch() {
  return useGraphqlSwrWithAuth<{
    subscriptions: {
      nodes: QueryResponse[]
    }
  }>({
    query: subscriptionsQuery,
    config: {
      refreshInterval: 60 * 60 * 1000, //60min -> update on cache mutation
    },
  })
}

export const subscriptionsQuery = gql`
  query {
    subscriptions {
      nodes {
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
`
