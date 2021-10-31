import { test, expect } from '@playwright/test'
import { request } from 'graphql-request'

import { dataQuery } from '../../src/fetcher/query'
import { QueryResponseWithRevisionAndTitle } from '../../src/fetcher/query-types'

test.use({ storageState: './__tests__/e2e/storage-state/sysadmin.json' })
test.setTimeout(3 * 60 * 1000) // tmp

test('is logged in', async ({ page }) => {
  const id = 138114 //applet

  const before = await queryUuid(id)

  await page.goto(`http://localhost:3000/entity/repository/add-revision/${id}`)

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

  // await page.screenshot({ path: '__tests__/e2e/debug.png' })

  // TODO: currently saving does not work so this is all pointless, yay :)
  await delay(2 * 60 * 1000)

  const after = await queryUuid(id)
  compareUuidWithRevisionAndTitle(before, after)
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
    after.currentRevision.title = after.currentRevision.title.slice(0, -1)
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
