import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { RevisionHistory } from '@/components/pages/revision-history'
import { useInstanceData } from '@/contexts/instance-context'
import { Revisions } from '@/fetcher/query-types'
import { basicUserDataFragment } from '@/fetcher/user/query'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface HistoryRevisionProps {
  id: number
}

export default renderedPageNoHooks<HistoryRevisionProps>((props) => (
  <FrontendClientBase entityId={props.id}>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ id }: HistoryRevisionProps) {
  const { data, error } = useFetch(id)
  const { strings } = useInstanceData()

  if (!data && !error) return <LoadingSpinner noText />

  if (!data || !data.uuid) {
    return (
      <>
        {renderBackbutton()}
        {renderTitle()}
        <h3 className="serlo-h3">{strings.errors.defaultMessage}</h3>
      </>
    )
  }

  const { uuid } = data

  return (
    <>
      {renderBackbutton()}
      {renderTitle(uuid.revisions.nodes.length)}
      <RevisionHistory data={uuid} />
    </>
  )

  function renderBackbutton(title?: string, alias?: string) {
    return (
      <Breadcrumbs
        data={[
          {
            label: title ?? strings.revisions.toContent,
            url: alias ?? `/${id}`,
          },
        ]}
        asBackButton
      />
    )
  }
  function renderTitle(amount?: number) {
    return (
      <PageTitle
        title={`${strings.pageTitles.revisionHistory} (${amount ?? '…'})`}
        headTitle
      />
    )
  }
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

function useFetch(id: number) {
  return useGraphqlSwr<{ uuid: Revisions }>({
    query: revisionHistoryQuery,
    variables: { id },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
  })
}

export const revisionHistoryQuery = gql`
  query revisions($id: Int!) {
    uuid(id: $id) {
      id
      alias
      __typename
      title
      ... on Applet {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Article {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Course {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on CoursePage {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Event {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
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
            trashed
            author {
              ...basicUserData
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
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Page {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            date
          }
        }
      }
      ... on Video {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
    }
  }

  ${basicUserDataFragment}
`
