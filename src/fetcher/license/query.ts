import { gql } from 'graphql-request'

export const licenseDetailsQuery = (id: number) => gql`
  query {
    license(id: ${id}) {
      title
      content
      iconHref
    }
  }
`
