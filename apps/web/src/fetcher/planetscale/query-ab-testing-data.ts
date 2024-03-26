import { gql } from 'graphql-request'

export const abSubmissionsQuery = gql`
  query {
    ExperimentQuery($experiment: String) {
      authorization
      abSubmissions(experiment: $experiment) {
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
