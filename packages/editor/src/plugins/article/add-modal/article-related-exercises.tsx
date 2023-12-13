import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useGraphqlSwr } from '@serlo/frontend/src/api/use-graphql-swr'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType, type UuidWithRevType } from '@serlo/frontend/src/data-types'
import { TaxonomyTermType } from '@serlo/frontend/src/fetcher/graphql-types/operations'
import { getTranslatedType } from '@serlo/frontend/src/helper/get-translated-type'
import { getIconByTypename } from '@serlo/frontend/src/helper/icon-by-entity-type'
import { gql } from 'graphql-request'

import { SerloAddButton } from '../../../plugin/helpers/serlo-editor-button'
import { InjectionStaticRenderer } from '../../injection/static'

interface ArticleRelatedExercisesProps {
  exerciseFolderId: number
  addEntry: (id: number, typename: UuidWithRevType, title?: string) => void
}

// TODO: codegen does not reach here
// actual fix: move serlo specific code to frontend repo or abstract another

export interface FetchExerciseFolderQuery {
  __typename?: 'Query'
  uuid?:
    | { __typename?: 'Applet' }
    | { __typename?: 'AppletRevision' }
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleRevision' }
    | { __typename?: 'Comment' }
    | { __typename?: 'Course' }
    | { __typename?: 'CoursePage' }
    | { __typename?: 'CoursePageRevision' }
    | { __typename?: 'CourseRevision' }
    | { __typename?: 'Event' }
    | { __typename?: 'EventRevision' }
    | { __typename?: 'Exercise' }
    | { __typename?: 'ExerciseGroup' }
    | { __typename?: 'ExerciseGroupRevision' }
    | { __typename?: 'ExerciseRevision' }
    | { __typename?: 'GroupedExercise' }
    | { __typename?: 'GroupedExerciseRevision' }
    | { __typename?: 'Page' }
    | { __typename?: 'PageRevision' }
    | {
        __typename: 'TaxonomyTerm'
        type: TaxonomyTermType
        children: {
          __typename?: 'AbstractUuidConnection'
          nodes: Array<
            | { __typename?: 'Applet' }
            | { __typename?: 'AppletRevision' }
            | { __typename?: 'Article' }
            | { __typename?: 'ArticleRevision' }
            | { __typename?: 'Comment' }
            | { __typename?: 'Course' }
            | { __typename?: 'CoursePage' }
            | { __typename?: 'CoursePageRevision' }
            | { __typename?: 'CourseRevision' }
            | { __typename?: 'Event' }
            | { __typename?: 'EventRevision' }
            | {
                __typename: 'Exercise'
                id: number
                trashed: boolean
                currentRevision?: {
                  __typename?: 'ExerciseRevision'
                  id: number
                } | null
              }
            | {
                __typename: 'ExerciseGroup'
                id: number
                trashed: boolean
                currentRevision?: {
                  __typename?: 'ExerciseGroupRevision'
                  id: number
                } | null
              }
            | { __typename?: 'ExerciseGroupRevision' }
            | { __typename?: 'ExerciseRevision' }
            | { __typename?: 'GroupedExercise' }
            | { __typename?: 'GroupedExerciseRevision' }
            | { __typename?: 'Page' }
            | { __typename?: 'PageRevision' }
            | { __typename?: 'TaxonomyTerm' }
            | { __typename?: 'User' }
            | { __typename?: 'Video' }
            | { __typename?: 'VideoRevision' }
          >
        }
      }
    | { __typename?: 'User' }
    | { __typename?: 'Video' }
    | { __typename?: 'VideoRevision' }
    | null
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
  const articleStrings = useEditorStrings().templatePlugins.article

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
        <InjectionStaticRenderer
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
