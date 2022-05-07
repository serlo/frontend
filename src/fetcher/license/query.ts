import { gql } from 'graphql-request'

export const licenseDetailsQuery = gql`
  query licenseDetails($id: Int!) {
    license {
      license(id: $id) {
        title
        content
        iconHref
      }
    }
  }
`
