import { gql } from 'graphql-request'
import Link from 'next/link'
import React from 'react'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { useAuth } from '@/auth/use-auth'
import { PageTitle } from '@/components/content/page-title'
import { LoadingSpinner } from '@/components/navigation/loading-spinner'
import { PageBaseDefault } from '@/components/page-base-default'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'
import { StyledP } from '@/components/tags/styled-p'
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
    <PageBaseDefault>
      <Content />
      {/* <ManageSubscriptions data={initialProps.pageData} /> */}
    </PageBaseDefault>
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
      renderUnauthorized()
    ) : !data ? (
      <LoadingSpinner noText />
    ) : error !== undefined ? (
      renderUnknownError()
    ) : (
      <ManageSubscriptions subscriptions={data.subscriptions.nodes} />
    )

  return (
    <>
      <PageTitle title={strings.subscriptions.title} headTitle />
      {output}
    </>
  )

  // TODO: Turn into components
  function renderUnauthorized() {
    return (
      <>
        <StyledP>
          <Link href="/api/auth/login">
            {strings.subscriptions.pleaseLogInLink}
          </Link>{' '}
          {strings.subscriptions.pleaseLogInText}
        </StyledP>
      </>
    )
  }

  // TODO: Turn into components
  function renderUnknownError() {
    return (
      <>
        <StyledP>{strings.subscriptions.unknownProblem}</StyledP>
      </>
    )
  }
}
