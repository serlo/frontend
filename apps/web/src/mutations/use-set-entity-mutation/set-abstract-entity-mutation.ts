import { gql } from 'graphql-request'

export const setAbstractEntityMutation = gql`
  mutation setAbstractEntity($input: SetAbstractEntityInput!) {
    entity {
      setAbstractEntity(input: $input) {
        __typename
        success
        record {
          id
          alias
        }
      }
    }
  }
`
