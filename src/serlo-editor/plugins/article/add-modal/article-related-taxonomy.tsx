// only used in frontend
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { gql } from 'graphql-request'

import { SerloAddButton } from '../../../plugin/helpers/serlo-editor-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { useEntityId } from '@/contexts/uuids-context'
import { UuidType, type UuidWithRevType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { getCategoryByTypename } from '@/helper/get-category-by-typename'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

interface ArticleRelatedTaxonomyProps {
  addEntry: (id: number, typename: UuidWithRevType, title?: string) => void
  checkDuplicates: (id: number, typename: UuidWithRevType) => boolean
  showExerciseFolderPreview: (id: number) => void
}

export function ArticleRelatedTaxonomy({
  addEntry,
  checkDuplicates,
  showExerciseFolderPreview,
}: ArticleRelatedTaxonomyProps) {
  const entityId = useEntityId()
  const { data, error } = useFetchParentTaxonomy(entityId ?? 0)

  const { strings } = useInstanceData()
  const articleStrings = useEditorStrings().templatePlugins.article

  const dataAndTerm = getCategorisedDataAndTerm(data, error)
  if (!dataAndTerm || !entityId) {
    const isNew =
      typeof window !== 'undefined' &&
      window.location.pathname.startsWith('/entity/create')
    return (
      <p className="mt-4 border-t-2 pt-4 italic text-gray-400">
        {isNew
          ? 'Sorry, folder preview is currently not supported for new articles.'
          : 'Sorry, something went wrong.'}
      </p>
    )
  }
  const { categorisedData, term } = dataAndTerm

  return (
    <div className="mt-5 border-t-2 pt-6">
      {articleStrings.addModal.addFromFolderTitle}
      <a
        className="ml-2 font-bold text-brand"
        target="_blank"
        href={`/${term.id}`}
        rel="noreferrer"
      >
        <FaIcon icon={getIconByTypename(UuidType.TaxonomyTerm)} /> {term.name}
      </a>
      <div className="mt-4 flex flex-wrap">
        {Object.entries(categorisedData).map(([typename, categoryData]) => {
          return renderList(typename as UuidWithRevType, categoryData)
        })}
      </div>
    </div>
  )

  function renderList(typename: UuidWithRevType, dataArray: ChildNode[]) {
    if (dataArray.length === 0) return null
    const isTax = typename === UuidType.TaxonomyTerm

    return (
      <div className="mr-4 max-w-[30%] py-2" key={typename}>
        <b className="mb-2 block">
          <FaIcon icon={getIconByTypename(typename)} />{' '}
          {isTax
            ? strings.entities.exerciseFolder
            : strings.categories[getCategoryByTypename(typename)]}
        </b>
        {isTax ? articleStrings.addModal.exerciseFolderNote : null}
        <ul>{dataArray.map((item) => renderLi(item, typename))}</ul>
      </div>
    )
  }

  function renderLi(item: ChildNode, typename: UuidWithRevType) {
    const title = typename.includes(UuidType.Exercise)
      ? getTranslatedType(strings, typename)
      : typename === UuidType.TaxonomyTerm
      ? item.name
      : item.currentRevision?.title

    if (!title) return null

    const isTax = typename === UuidType.TaxonomyTerm

    if (checkDuplicates(item.id, typename)) return null

    return (
      <li key={item.id} className="group flex justify-between">
        <a
          href={`/${item.id}`}
          className="mb-2 mt-1 leading-tight text-brand"
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>{' '}
        {isTax ? (
          <button
            className="serlo-button-editor-secondary invisible ml-2 max-h-8 self-center whitespace-nowrap text-base leading-browser group-focus-within:visible group-hover:visible"
            onClick={() => {
              showExerciseFolderPreview(item.id)
            }}
            title="Preview"
          >
            <FaIcon icon={faSearch} />
          </button>
        ) : null}
        <SerloAddButton
          text=""
          className="invisible ml-2 max-h-8 self-center whitespace-nowrap group-focus-within:visible group-hover:visible"
          onClick={() => {
            addEntry(item.id, item.__typename, title)
          }}
        />
      </li>
    )
  }
}

const fetchParentQuery = gql`
  query fetchParentQuery($id: Int!) {
    uuid(id: $id) {
      ... on Article {
        taxonomyTerms {
          ...taxonomyTerm
        }
      }
    }
  }

  fragment taxonomyTerm on TaxonomyTermConnection {
    nodes {
      id
      type
      name
      children {
        nodes {
          id
          __typename
          trashed
          ... on Article {
            currentRevision {
              title
            }
          }
          ... on Course {
            currentRevision {
              title
            }
          }
          ... on Video {
            currentRevision {
              title
            }
          }
          ... on TaxonomyTerm {
            name
            type
          }
          ... on Exercise {
            currentRevision {
              id
            }
          }
        }
      }
    }
  }
`

interface ChildNode {
  __typename: UuidWithRevType
  id: number
  trashed: boolean
  currentRevision?: {
    title?: string
    id?: string
  }
  type?: TaxonomyTermType
  name?: string
}

interface FetchParentType {
  uuid: {
    taxonomyTerms: {
      nodes: {
        type: TaxonomyTermType
        name: string
        id: number
        children: {
          nodes: ChildNode[]
        }
      }[]
    }
  }
}

function useFetchParentTaxonomy(id: number) {
  return useGraphqlSwr<FetchParentType>({
    query: fetchParentQuery,
    variables: { id },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
  })
}

function getCategorisedDataAndTerm(data?: FetchParentType, error?: object) {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return false
  }
  if (!data) return null
  const { uuid } = data
  if (!uuid) return null

  const term = uuid.taxonomyTerms?.nodes.find((node) => node.type === 'topic')
  if (!term || term.children.nodes.length === 0) return null

  const categorisedData = {} as {
    [key: string]: ChildNode[]
  }

  term.children.nodes.map((child) => {
    const isEx = child.__typename.includes(UuidType.Exercise)
    const isTax = child.__typename === UuidType.TaxonomyTerm

    if (
      ![
        UuidType.Article,
        UuidType.Course,
        UuidType.CoursePage,
        UuidType.Video,
      ].includes(child.__typename as UuidType) &&
      !isEx &&
      !isTax
    )
      return

    if (isTax && child.type !== TaxonomyTermType.ExerciseFolder) return

    if ((!isTax && !child.currentRevision) || child.trashed) return

    const category = isEx ? UuidType.Exercise : child.__typename
    if (!categorisedData[category]) categorisedData[category] = []
    categorisedData[category].push(child)
  })

  return { categorisedData, term }
}
