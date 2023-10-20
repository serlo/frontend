import { gql } from 'graphql-request'

export const idsQuery = (ids: number[]) => {
  const queries = ids.map(
    (id) => gql` 
    uuid${id}: uuid(id:${id}) {
        ... on AbstractEntity {
          alias
          instance
        }
        ... on Page {
          alias
          instance
        }
        ... on TaxonomyTerm {
          alias
          instance
        }
      }
    `
  )
  return `{${queries.join()}}`
}
