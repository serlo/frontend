// Use `yarn check:api` in root to run this script.
import { request, gql } from 'graphql-request'
import { exit } from 'process'

const query = gql`
  query getAPIVersion {
    version
  }
`

const checkApi = async (domain) => {
  try {
    const response = await request(`https://api.${domain}/graphql`, query)
    const { version } = response
    console.log(`api.${domain} running:\x1b[32m ${version}\x1b[0m`)
  } catch {
    console.error(
      `\x1b[33m⚠️ \x1b[31mCould not connect to api.${domain} \x1b[33m⚠️\x1b[0m`
    )
    exit(1)
  }
}

checkApi('serlo-staging.dev')
checkApi('serlo.org')
