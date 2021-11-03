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

// exersice groups
//15383
// const uuids = [
//   43019, 27286, 211077, 207852, 191096, 5803, 189852, 214613, 228003,
// ]
//const uuids = [32599,48893,189342,213431,217130,12161,132165,13757,208844,15063]
//const uuids = [161092,213749,5555,138819,12723,3033,22139,32277,118832,14259]

const uuids = [120634]
// const course = [
//   120634, 57668, 113266, 186579, 174933, 178848, 206384, 199276, 207327, 222208,
// ]
// const course2 = [
//   179755, 187184, 178833, 215508, 179160, 160492, 168394, 162011, 68149, 207359,
// ]

// test.use({ storageState: './__tests__/e2e/storage-state/sysadmin.json' })
test.setTimeout(10 * 60 * 1000) // tmp

test('save and check uuid results', async () => {
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
    const title = page.locator('h1 input')
    // const newValue = (await title.getAttribute('value')) ?? '' + '$'
    // await page.fill('h1 input', newValue)
    await title.focus()
    await title.press('$')
    // await delay(2 * 1000)
    // await page.keyboard.type('$$$$$')
    // await delay(1 * 1000)
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
    await delay(4 * 1000) //30s
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
    //before.currentRevision.content = 'skipped'
    // before.course.pages = null
  }

  if (after.currentRevision) {
    after.currentRevision.id = 0
    // after.currentRevision.content = after.currentRevision.content.replace(
    //   '$$$$$',
    //   ''
    // )
    // if (after.currentRevision.title) {
    after.currentRevision.title = after.currentRevision.title.slice(0, -1)
    // after.course.pages = null
    // }
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
