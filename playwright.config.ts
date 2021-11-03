import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  // globalSetup: require.resolve('./__tests__/e2e/global-setup'),
  testDir: '__tests__/e2e',
}
// eslint-disable-next-line import/no-default-export
export default config
