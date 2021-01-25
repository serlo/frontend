import { gql } from 'graphql-request'
import React from 'react'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'
import { useInstanceData } from '@/contexts/instance-context'
import { QueryResponse } from '@/fetcher/query-types'

export default function Page() {
  const response = useFetch()
  return (
    <FrontendClientBase>
      <Title />
      <Guard {...response} needsAuth>
        <ManageSubscriptions
          subscriptions={response.data?.subscriptions.nodes!}
        />
      </Guard>
    </FrontendClientBase>
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
    query,
    config: {
      refreshInterval: 60 * 60 * 1000, //60min -> update on cache mutation
    },
  })
}

const query = gql`
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
