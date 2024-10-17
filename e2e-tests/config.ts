import dotenv from 'dotenv'

const localUrl = 'http://localhost:3000'
const stagingUrl = 'https://de.serlo-staging.dev'

export const configInput = (() => {
  dotenv.config()

  const isCI = Boolean(process.env.CI)
  const browser = process.env.BROWSER ?? 'chromium'
  const localApi = process.env.FRONTEND_API === 'local'

  const defaultUrl = localApi ? localUrl : stagingUrl
  const frontendUrl = process.env.FRONTEND_URL ?? defaultUrl

  const adminUser = localApi ? 'admin' : 'Kulla'

  const isChromium = browser === 'chromium'

  return { isCI, browser, frontendUrl, adminUser, isChromium }
})()
