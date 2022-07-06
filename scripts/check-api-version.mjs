// Use `yarn check:api` in root to run this script.
import { request, gql } from 'graphql-request'
import { createRequire } from 'module'

const query = gql`
  query getAPIVersion {
    metadata {
      version
    }
  }
`

const require = createRequire(import.meta.url)

const getVersion = async (domain) => {
  const response = await request(`https://api.${domain}/graphql`, query)
  return response.metadata.version
}

const stagingVersion = await getVersion('serlo-staging.dev')
const productionVersion = await getVersion('serlo.org')

console.log(`staging is: \x1b[32m ${stagingVersion}\x1b[0m`)
console.log(`production is: \x1b[32m ${productionVersion}\x1b[0m`)
