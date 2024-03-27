import { gql } from 'graphql-request'

export const idsQuery = (ids: number[], opts?: { withTitle?: boolean }) => {
  const queries = ids.map(
    (id) => gql` 
    uuid${id}: uuid(id:${id}) {
          alias
          ${opts?.withTitle ? 'title' : ''}
          ... on InstanceAware{instance}
      }
    `
  )
  return `{${queries.join()}}`
}
