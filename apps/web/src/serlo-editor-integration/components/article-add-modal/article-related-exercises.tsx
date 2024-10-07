import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { gql } from 'graphql-request'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType, type UuidWithRevType } from '@/data-types'
import {
  FetchExerciseFolderQuery,
  TaxonomyTermType,
} from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { InjectionSerloStaticRenderer } from '@/serlo-editor-integration/serlo-plugin-wrappers/injection-serlo-static-renderer'

interface ArticleRelatedExercisesProps {
  exerciseFolderId: number
  addEntry: (id: number, typename: UuidWithRevType, title?: string) => void
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
  const articleStrings = useEditStrings().templatePlugins.article

  const errorReturn = <p>Sorry, something went wrong.</p>

  if (error) return errorReturn
  if (!data) return <p>…</p>

  const { uuid } = data

  if (
    uuid?.__typename !== UuidType.TaxonomyTerm ||
    uuid.type !== TaxonomyTermType.ExerciseFolder
  ) {
    return errorReturn
  }

  return (
    <div className="mt-5 border-t-2 pt-6">
      <a
        className="ml-2 font-bold text-brand"
        target="_blank"
        href={`/${exerciseFolderId}`}
        rel="noreferrer"
      >
        <FaIcon icon={getIconByTypename(TaxonomyTermType.ExerciseFolder)} />
        {strings.entities.exerciseFolder} {exerciseFolderId}
      </a>{' '}
      Preview:
      <div className="mt-4">
        {uuid.children.nodes.map((node) => {
          return Object.hasOwn(node, 'id') ? renderExercises(node) : null
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
      <div key={id} className="my-5 border-t-2 border-black py-5">
        <InjectionSerloStaticRenderer
          plugin={EditorPluginType.Injection}
          state={`/${id}`}
        />
        <SerloAddButton
          text={articleStrings.addModal.buttonAddType.replace(
            '%type%',
            getTranslatedType(strings, __typename)
          )}
          onClick={() => {
            addEntry(id, UuidType.Exercise)
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
        __typename
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
