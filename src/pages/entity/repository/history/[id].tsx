import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { RevisionHistory } from '@/components/pages/revision-history'
import { useInstanceData } from '@/contexts/instance-context'
import { HistoryRevisionProps, HistoryRevisionsData } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<HistoryRevisionProps>((props) => (
  <FrontendClientBase entityId={props.id}>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ id }: HistoryRevisionProps) {
  const response = useFetch(id)
  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: response.data?.uuid.currentRevision.title ?? '',
            url: response.data?.uuid.alias ?? undefined,
          },
        ]}
        asBackButton
      />
      <Title />
      <Guard {...response}>
        <RevisionHistory data={response.data?.uuid} />
      </Guard>
    </>
  )
}

export const getStaticProps: GetStaticProps<HistoryRevisionProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)
  return {
    props: {
      id,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.revisionHistory} headTitle />
}

function useFetch(id: number) {
  return useGraphqlSwr<{ uuid: HistoryRevisionsData }>({
    query,
    variables: { id },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
  })
}

const query = gql`
  query getRevisions($id: Int!) {
    uuid(id: $id) {
      id
      alias
      ... on Applet {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Article {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Course {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on CoursePage {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Event {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Exercise {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on ExerciseGroup {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on GroupedExercise {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Page {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            date
          }
        }
      }
      ... on Video {
        currentRevision {
          title
          id
        }
        revisions {
          nodes {
            id
            author {
              ...authorData
            }
            changes
            date
          }
        }
      }
    }
  }

  fragment authorData on User {
    id
    username
    activeAuthor
    activeDonor
    activeReviewer
  }
`
