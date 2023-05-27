import request, { gql } from 'graphql-request'

import { getMonthlyViews } from './_fetch-monthly-views'
import { parseEntry } from './_parse-entry'
import {
  Instance,
  QuickbarSingleEntityQuery,
} from '@/fetcher/graphql-types/operations'

const endpoint = 'https://api.serlo-staging.dev/graphql'

export type QueryEntry = Extract<
  QuickbarSingleEntityQuery['singleQuery'],
  { __typename: string }
>

export interface QuickbarDataEntry {
  id: number
  title: string
  path: string[]
  type: string // UuidType
  subject: string
  views?: number
}

export async function collectData(ids: number[]) {
  const req = (await request(
    endpoint,
    buildEntitiesQuery(ids)
  )) as unknown as Record<string, QueryEntry>

  const entitiesData = Object.values(req)

  const parsedData = entitiesData
    .map(parseEntry)
    .filter(Boolean) as NonNullable<ReturnType<typeof parseEntry>>[]

  const aliases = parsedData.map((entry) => entry.alias)
  const viewsData = await getMonthlyViews(Instance.De, aliases)

  // merge in views
  const mergedData: QuickbarDataEntry[] = parsedData.map((entity) => {
    const views = viewsData?.find(
      (obj) => obj.value === entity.alias
    )?.pageviews
    // eslint-disable-next-line no-console
    if (!views) console.error(entity.alias)
    return { ...entity, views, alias: undefined }
  })

  return mergedData
}

// mockup for codegen
const singleEntityQuery = gql`
  query quickbarSingleEntity {
    singleQuery: uuid(id: 999) {
      id
      alias
      trashed
      title

      ... on Page {
        __typename
        navigation {
          path {
            nodes {
              label
            }
          }
        }
      }

      ... on CoursePage {
        __typename
        course {
          title
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
      }

      ... on Article {
        __typename
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

      ... on TaxonomyTerm {
        __typename
        navigation {
          path {
            nodes {
              label
            }
          }
        }
      }
    }
  } #last
`
// multiple names queries in single query save requests
function buildEntitiesQuery(ids: number[]) {
  const singleQueries = ids
    .map((id) =>
      singleEntityQuery
        .replace('query quickbarSingleEntity {', '')
        .replace('} #last', '')
        .replace('singleQuery', `uuid${id}`)
        .replace('999', id.toString())
    )
    .join('\n')
  return 'query {' + singleQueries + '}'
}
