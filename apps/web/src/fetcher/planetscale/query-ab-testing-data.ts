import { gql } from 'graphql-request'

export const abSubmissionsQuery = gql`
  query {
    ExperimentQuery($experiment: String, limit: Int!, cursor: String!) {
      authorization
      abSubmissions(experiment: $experiment, limit: $limit, cursor: $cursor) {
        id
        experiment
        instance
        revisionId
        result
        type
        createdAt
      }
    }
  }
`
