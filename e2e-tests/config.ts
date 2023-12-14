import dotenv from 'dotenv'

function createConfig() {
  dotenv.config()

  const useLocalAPI = process.env.FRONTEND_API == 'local'

  return {
    adminUser: useLocalAPI ? 'admin' : 'Kulla',
    isCI: Boolean(process.env.CI),
    browser: process.env.BROWSER ?? 'chromium',
    frontendUrl:
      process.env.FRONTEND_URL ?? useLocalAPI
        ? 'http://localhost:3000'
        : 'https://de.serlo-staging.dev',
  }
}

const config = createConfig()

export default config
