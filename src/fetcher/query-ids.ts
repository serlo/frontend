import { gql } from 'graphql-request'

export const idsQuery = (ids: number[]) => {
  const map = ids.map(
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
  return `{${map.join()}}`
}
