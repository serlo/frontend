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
// const { devDependencies } = require('../package.json')

const getVersion = async (domain) => {
  const response = await request(`https://api.${domain}/graphql`, query)
  return response.metadata.version
}

// console.log(devDependencies)

const stagingVersion = await getVersion('serlo-staging.dev')
const productionVersion = await getVersion('serlo.org')
// const dependencyVersion = devDependencies['@serlo/api'].replace('^', '')

// console.log(`frontend needs: \x1b[32m ${dependencyVersion}\x1b[0m`)
console.log(`staging is: \x1b[32m ${stagingVersion}\x1b[0m`)
console.log(`production is: \x1b[32m ${productionVersion}\x1b[0m`)

// if (productionVersion !== dependencyVersion) {
//   throw '\x1b[33m ⚠️ \x1b[31m production does not match expected version!'
// }
