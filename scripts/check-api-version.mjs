// Use `yarn check:api` in root to run this script.
import fetch from 'node-fetch'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { devDependencies } = require('../package.json')

const getVersion = async () => {
  const response = await fetch('http://api.serlo-staging.dev/')
  return await response.text()
}

const stagingVersion = await getVersion('http://api.serlo-staging.dev/')
const productionVersion = await getVersion('http://api.serlo.org/')
const dependencyVersion = devDependencies['@serlo/api'].replace('^', '')

console.log(`frontend needs: \x1b[32m ${dependencyVersion}\x1b[0m`)
console.log(`staging has: \x1b[32m ${stagingVersion}\x1b[0m`)
console.log(`production has: \x1b[32m ${productionVersion}\x1b[0m`)

if (productionVersion !== dependencyVersion) {
  throw '\x1b[33m ⚠️ \x1b[31m production does not match expected version!'
}
