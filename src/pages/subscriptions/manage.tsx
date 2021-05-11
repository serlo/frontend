import { gql } from 'graphql-request'
import { useState } from 'react'
import styled from 'styled-components'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { ManageSubscriptions } from '@/components/pages/manage-subscriptions'
import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { QueryResponse } from '@/fetcher/query-types'
import { makeLightButton, makePrimaryButton } from '@/helper/css'
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
      <StyledP>
        {/* //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported*/}
        {filters.map((typename) => (
          <TabButton
            key={typename}
            active={showTypename == typename}
            onPointerUp={(e) => e.currentTarget.blur()}
            onClick={() => setShowTypename(typename)}
          >
            {getEntityStringByTypename(typename, strings)}
          </TabButton>
        ))}
      </StyledP>
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

const TabButton = styled.button<{ active: boolean }>`
  ${(props) => (props.active ? makePrimaryButton : makeLightButton)}
  margin-right: 8px;
  margin-bottom: 10px;
`

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
