// global-setup.ts
import { chromium, Page } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const options = {
  httpCredentials: {
    username: process.env.STAGING_HTTP_USERNAME ?? '',
    password: process.env.STAGING_HTTP_USERNAME ?? '',
  },
}

async function globalSetup() {
  const browser = await chromium.launch()
  const sysadminPage = await browser.newPage(options)

  async function login(page: Page, user: string) {
    await page.goto('https://de.serlo-staging.dev/auth/login')
    await page.fill('input[name="email"]', user)
    await page.fill('input[name="password"]', '123456')
    await page.click('button[name="submit"]')
  }

  await login(sysadminPage, 'inyono')

  await sysadminPage
    .context()
    .storageState({ path: './__tests__/e2e/storage-state/sysadmin.json' })

  const loginPage = await browser.newPage(options)
  await login(loginPage, 'botho')

  await loginPage.context().storageState({
    path: './__tests__/e2e/storage-state/login.json',
  })
  await browser.close()
}

// eslint-disable-next-line import/no-default-export
export default globalSetup
