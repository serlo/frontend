import { gql } from 'graphql-request'

export const idsQuery = (ids: number[], opts?: { withTitle?: boolean }) => {
  const queries = ids.map(
    (id) => gql` 
    uuid${id}: uuid(id:${id}) {
        ... on AbstractEntity {
          alias
          instance
          ${opts?.withTitle ? 'title' : ''}
        }
        ... on Page {
          alias
          instance
          ${opts?.withTitle ? 'title' : ''}
        }
        ... on TaxonomyTerm {
          alias
          instance
          ${opts?.withTitle ? 'title' : ''}
        }
      }
    `
  )
  return `{${queries.join()}}`
}
