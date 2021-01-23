import { gql } from 'graphql-request'
import React from 'react'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { useAuth } from '@/auth/use-auth'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingError } from '@/components/loading/loading-error'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { QueryResponse } from '@/fetcher/query'
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

function Content() {
  const auth = useAuth()
  const { strings } = useInstanceData()
  const { data, error } = useGraphqlSwrWithAuth<{
    subscriptions: {
      nodes: QueryResponse[]
    }
  }>({
    query,
    config: {
      refreshInterval: 60 * 60 * 1000, //60min -> only update on cache mutation
    },
  })

  const output =
    auth.current === null ? (
      <PleaseLogIn />
    ) : !data ? (
      <LoadingSpinner noText />
    ) : error !== undefined ? (
      <LoadingError error={error} />
    ) : (
      <ManageSubscriptions subscriptions={data.subscriptions.nodes} />
    )

  return (
    <>
      <PageTitle title={strings.pageTitles.subscriptions} headTitle />
      {output}
    </>
  )
}
