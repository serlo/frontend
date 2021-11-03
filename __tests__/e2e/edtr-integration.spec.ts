import { chromium, Page, test, expect } from '@playwright/test'
import dotenv from 'dotenv'
import { request } from 'graphql-request'
import path from 'path'

import { dataQuery } from '../../src/fetcher/query'
import { QueryResponseWithRevisionAndTitle } from '../../src/fetcher/query-types'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const options = {
  httpCredentials: {
    username: process.env.STAGING_HTTP_USERNAME ?? '',
    password: process.env.STAGING_HTTP_USERNAME ?? '',
  },
}

//142218, 145458,
const events = [
  145459, 145464, 145590, 146498, 146500, 146512, 147713, 147733, 149177,
  150501, 179657, 196426,
]

// test.use({ storageState: './__tests__/e2e/storage-state/sysadmin.json' })
test.setTimeout(3 * 60 * 1000) // tmp

test('is logged in', async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage(options)

  await login(page, 'inyono')

  for (const id of events) {
    console.log(`checking ${id.toString()}`)
    await checkId(id)
  }

  async function checkId(id: number) {
    const before = await queryUuid(id)

    await page.goto(
      `https://de.serlo-staging.dev/entity/repository/add-revision/${id}`
    )

    //change title
    const title = page.locator('.page-header h1 input')
    const newValue = (await title.getAttribute('value')) ?? '' + '$'
    await page.fill('.page-header h1 input', newValue)
    await title.focus()
    await title.press('$')

    //save
    await page.click('button.serlo-make-interactive-green')

    const textarea = page.locator('.ReactModalPortal label textarea')
    await textarea.focus()
    await textarea.press('$')

    const licenseCheck = page
      .locator('.ReactModalPortal label input[type="checkbox"]')
      .first()
    await licenseCheck.click()

    const skipReview = page
      .locator('.ReactModalPortal label input[type="checkbox"]')
      .nth(3)
    await skipReview.click()

    await page.click('.ReactModalPortal button.serlo-make-interactive-green')

    //make sure data is updated
    await delay(10 * 1000) //30s
    await page.screenshot({ path: '__tests__/e2e/saved.png' })

    const after = await queryUuid(id)
    compareUuidWithRevisionAndTitle(before, after)
  }
})

function compareUuidWithRevisionAndTitle(
  before: QueryResponseWithRevisionAndTitle,
  after: QueryResponseWithRevisionAndTitle
) {
  if (before.currentRevision) {
    before.currentRevision.id = 0
  }
  if (after.currentRevision) {
    after.currentRevision.id = 0
    console.log(before.currentRevision?.title)
    if (after.currentRevision.title) {
      after.currentRevision.title = after.currentRevision.title.slice(0, -1)
    }
  }
  expect(after).toEqual(before)
}

async function queryUuid(id: number) {
  const { uuid } = await request<{
    uuid: QueryResponseWithRevisionAndTitle
  }>('https://api.serlo-staging.dev/graphql', dataQuery, {
    alias: { instance: 'de', path: `/${id}` },
  })
  return uuid
}

function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

async function login(page: Page, user: string) {
  await page.goto('https://de.serlo-staging.dev/auth/login')
  await page.fill('input[name="email"]', user)
  await page.fill('input[name="password"]', '123456')
  await page.click('button[name="submit"]')
}
