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

// const applets1 = [
//   111508, 124925, 112291, 112257, 112371, 124904, 124733, 112201, 112561,
//   212942,
// ]

// const applets2 = [
//   112288, 112263, 112595, 112243, 112208, 112238, 138255, 115210, 112578,
//   124906, 112295,
// ]

//215525,129914,194450,210085,193828,167875,134372,178851,129891,155850,
//136989,52411,163197,30222,173320,196539,36766,44309,202941,72181,

// test.use({ storageState: './__tests__/e2e/storage-state/sysadmin.json' })
test.setTimeout(10 * 60 * 1000) // tmp

test('is logged in', async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage(options)

  await login(page, 'inyono')

  for (const id of uuids) {
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
    await delay(5 * 1000) //30s
    // await page.screenshot({ path: '__tests__/e2e/saved.png' })

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
