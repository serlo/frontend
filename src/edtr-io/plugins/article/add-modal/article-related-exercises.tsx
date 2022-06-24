import { Icon } from '@edtr-io/ui'
import { TaxonomyTermType } from '@serlo/api'
import { gql } from 'graphql-request'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { Injection } from '@/components/content/injection'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { FetchExerciseFolderQuery } from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { renderNested } from '@/schema/article-renderer'

interface ArticleRelatedExercisesProps {
  exerciseFolderId: number
  addEntry: (id: number, typename: string, title?: string) => void
}

type ChildNodes = Extract<
  FetchExerciseFolderQuery['uuid'],
  { type: any }
>['children']['nodes']
type ChildNode = Extract<ChildNodes[number], { id: any }>

export function ArticleRelatedExercises({
  exerciseFolderId,
  addEntry,
}: ArticleRelatedExercisesProps) {
  const { data, error } = useFetchExerciseFolder(exerciseFolderId)

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  const errorReturn = <p>Sorry, something went wrong</p>

  if (!data || error) return errorReturn
  const { uuid } = data
  if (
    uuid?.__typename !== 'TaxonomyTerm' ||
    uuid.type !== TaxonomyTermType.ExerciseFolder
  )
    return errorReturn

  return (
    <div className="mt-5 border-t-2 pt-6">
      <a
        className="font-bold text-brand ml-2"
        target="_blank"
        href={`/${exerciseFolderId}`}
        rel="noreferrer"
      >
        <Icon icon={getIconByTypename(TaxonomyTermType.ExerciseFolder)} />
        {strings.entities.exerciseFolder} {exerciseFolderId}
      </a>{' '}
      Preview:
      <div className="mt-4">
        {uuid.children.nodes.map((node) => {
          return hasOwnPropertyTs(node, 'id') ? renderExercises(node) : null
        })}
      </div>
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

const fetchExerciseFolderQuery = gql`
  query fetchExerciseFolder($id: Int!) {
    uuid(id: $id) {
      ... on TaxonomyTerm {
        type
        children {
          nodes {
            ... on Exercise {
              id
              trashed
              __typename
              currentRevision {
                id
              }
            }
            ... on ExerciseGroup {
              id
              trashed
              __typename
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

function useFetchExerciseFolder(id: number) {
  return useGraphqlSwr<FetchExerciseFolderQuery>({
    query: fetchExerciseFolderQuery,
    variables: { id },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
  })
}
