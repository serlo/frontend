import { gql } from 'graphql-request'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getCategoryByTypename } from '@/helper/get-category-by-typename'
import { getTranslatedType } from '@/helper/get-translated-type'

interface ArticleRelatedTaxonomyProps {
  addEntry: (id: number, typename: string, title?: string) => void
  checkDuplicates: (id: number, typename: string) => boolean
}

export function ArticleRelatedTaxonomy({
  addEntry,
  checkDuplicates,
}: ArticleRelatedTaxonomyProps) {
  const entityId = useEntityId()
  const { data, error } = useFetchParentTaxonomy(entityId)

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article

  return <div className="mt-5">{renderOverview()}</div>

  function renderOverview() {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return 'Sorry, something went wrong'
    }
    if (!data) return null
    const { uuid } = data
    if (!uuid) return null

    const term = uuid.taxonomyTerms.nodes.find((node) => node.type === 'topic')
    if (!term || term.children.nodes.length === 0) return null

    const categorisedData = {} as {
      [key: string]: {
        __typename: string
        id: number
        currentRevision?: {
          title: string
        }
      }[]
    }

    term.children.nodes.map((child) => {
      const isEx = child.__typename.includes('Exercise')
      if (
        !['Article', 'Course', 'CoursePage', 'TaxonomyTerm'].includes(
          child.__typename
        ) &&
        !isEx
      )
        return

      const category = isEx ? 'Exercise' : child.__typename
      if (!categorisedData[category]) categorisedData[category] = []
      categorisedData[category].push(child)
    })

    return (
      <div>
        {articleStrings.addFromFolderTitle} <b>{term?.name}:</b>
        <div className="mt-6">
          {Object.entries(categorisedData).map(([_key, categoryData]) => {
            return renderList(categoryData)
          })}
        </div>
      </div>
    )
  }

  function renderList(dataArray: ChildNode[]) {
    if (dataArray.length === 0) return null
    const typename = dataArray[0].__typename
    return (
      <>
        <b>{strings.categories[getCategoryByTypename(typename)]}</b>
        <div className="mt-4 pb-4 mb-4 border-b-2" style={{ columnCount: 3 }}>
          {dataArray.map((item) => {
            const title = typename.includes('Exercise')
              ? getTranslatedType(strings, typename)
              : typename === 'TaxonomyTerm'
              ? item.name
              : item.currentRevision?.title

            if (!title) return null
            if (typename === 'TaxonomyTerm' && item.type !== 'topicFolder')
              return null

            if (checkDuplicates(item.id, typename)) return null

            return (
              <div key={item.id} className="group">
                <a href={`/${item.id}`} target="_blank" rel="noreferrer">
                  {title}
                </a>{' '}
                <SerloAddButton
                  className="invisible group-hover:visible"
                  onClick={() => {
                    addEntry(item.id, item.__typename, title)
                  }}
                />
                <br />
              </div>
            )
          })}
        </div>
      </>
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
      type
      name
      children {
        nodes {
          id
          __typename
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
        }
      }
    }
  }
`

interface ChildNode {
  __typename: string
  id: number
  currentRevision?: {
    title: string
  }
  type?: string
  name?: string
}

function useFetchParentTaxonomy(id: number) {
  return useGraphqlSwr<{
    uuid: {
      taxonomyTerms: {
        nodes: {
          type: string
          name: string
          children: {
            nodes: ChildNode[]
          }
        }[]
      }
    }
  }>({
    query: fetchParentQuery,
    variables: { id },
    config: {
      refreshInterval: 1 * 60 * 1000, //1min
    },
  })
}
