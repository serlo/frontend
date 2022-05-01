import { Icon } from '@edtr-io/ui'
import { gql } from 'graphql-request'

import { SerloAddButton } from '../../helpers/serlo-editor-button'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { useEntityId } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getCategoryByTypename } from '@/helper/get-category-by-typename'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

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
      [key: string]: ChildNode[]
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

      if (!child.currentRevision || child.trashed) return

      const category = isEx ? 'Exercise' : child.__typename
      if (!categorisedData[category]) categorisedData[category] = []
      categorisedData[category].push(child)
    })

    return (
      <div className="border-t-2 border-truegray-500 pt-4">
        {articleStrings.addFromFolderTitle}
        <br />
        <a
          className="font-bold text-brand"
          target="_blank"
          href={`/${term?.id}`}
          rel="noreferrer"
        >
          <Icon icon={getIconByTypename('folder')} /> {term?.name}
        </a>
        :
        <div className="mt-4">
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
      <div className="py-3 border-t-2">
        <b>
          <Icon icon={getIconByTypename(typename)} />{' '}
          {strings.categories[getCategoryByTypename(typename)]}
        </b>
        <div>
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
              <div key={item.id} className="group flex justify-between">
                <a
                  href={`/${item.id}`}
                  className="text-brand mt-1 mb-2 leading-tight"
                  target="_blank"
                  rel="noreferrer"
                >
                  {title}
                </a>{' '}
                <SerloAddButton
                  className="invisible group-hover:visible group-focus-within:visible whitespace-nowrap ml-2 max-h-8 self-center"
                  onClick={() => {
                    addEntry(item.id, item.__typename, title)
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
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
  __typename: string
  id: number
  trashed: boolean
  currentRevision?: {
    title?: string
    id?: string
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
          id: number
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
