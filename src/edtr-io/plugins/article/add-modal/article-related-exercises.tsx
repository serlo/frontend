import { Icon } from '@edtr-io/ui'
import { gql } from 'graphql-request'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { Injection } from '@/components/content/injection'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { renderNested } from '@/schema/article-renderer'

interface ArticleRelatedExercisesProps {
  topicFolderId: number
  addEntry: (id: number, typename: string, title?: string) => void
}

export function ArticleRelatedExercises({
  topicFolderId,
  addEntry,
}: ArticleRelatedExercisesProps) {
  const { data, error } = useFetchTopicFolder(topicFolderId)

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  const errorReturn = <p>Sorry, something went wrong</p>

  if (!data || error) return errorReturn
  const { uuid } = data
  if (uuid.type !== 'topicFolder') return errorReturn

  return (
    <div className="mt-5 border-t-2 pt-6">
      <a
        className="font-bold text-brand ml-2"
        target="_blank"
        href={`/${topicFolderId}`}
        rel="noreferrer"
      >
        <Icon icon={getIconByTypename('folder')} />
        {strings.entities.topicFolder} {topicFolderId}
      </a>{' '}
      Preview:
      <div className="mt-4">{uuid.children.nodes.map(renderExercises)}</div>
    </div>
  )

  function renderExercises({
    currentRevision,
    id,
    __typename,
    trashed,
  }: ChildNode) {
    if (!currentRevision || trashed) return null

    return (
      <div key={id} className="border-t-2 border-black py-5 my-5">
        <Injection
          href={`/${id}`}
          renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
        />
        <SerloAddButton
          text={articleStrings.addModal.buttonAddType.replace(
            '%type%',
            getTranslatedType(strings, __typename)
          )}
          onClick={() => {
            addEntry(id, 'Exercise')
          }}
        />
      </div>
    )
  }
}

const fetchTopicFolderQuery = gql`
  query fetchTopicFolderQuery($id: Int!) {
    uuid(id: $id) {
      ... on TaxonomyTerm {
        type
        children {
          nodes {
            id
            trashed
            __typename
            ... on Exercise {
              currentRevision {
                id
              }
            }
            ... on ExerciseGroup {
              currentRevision {
                id
              }
            }
          }
        }
      }
    }
  }
`

interface ChildNode {
  __typename: string
  id: number
  trashed: boolean
  currentRevision?: {
    id: number
  }
}

interface FetchTopicFolderType {
  uuid: {
    type: string
    children: {
      nodes: ChildNode[]
    }
  }
}

function useFetchTopicFolder(id: number) {
  return useGraphqlSwr<FetchTopicFolderType>({
    query: fetchTopicFolderQuery,
    variables: { id },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
  })
}
