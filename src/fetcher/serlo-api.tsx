import { request } from 'graphql-request'
import { dataQuery, idQuery, idsQuery } from './query'
import { processResponse } from './processResponse'
import { extractLinks } from './extractLinks'

export const endpoint = 'https://api.serlo.org/graphql'

export default async function fetchContent(alias: string, redirect) {
  try {
    if (redirect && /^\/[\d]+$/.test(alias)) {
      // redirect id to alias
      const response = await request(endpoint, idQuery(alias.substring(1)))
      const redirect = response.uuid.alias
      if (redirect) {
        return { redirect }
      }
    }
  } catch (e) {
    // on error: continue with data
  }

  try {
    const QUERY = dataQuery(
      /^\/[\d]+$/.test(alias)
        ? 'id: ' + alias.substring(1)
        : `alias: { instance: de, path: "${alias}"}`
    )
    const reqData = await request(endpoint, QUERY)
    // compat: redirect first page of course
    if (
      reqData.uuid.__typename === 'Course' &&
      Array.isArray(reqData.uuid.pages)
    ) {
      const filtered = reqData.uuid.pages.filter(page => page.alias !== null)
      if (filtered.length > 0) {
        return { redirect: filtered[0].alias }
      }
    }
    if (redirect && reqData.uuid.alias && reqData.uuid.alias !== alias) {
      return { redirect: reqData.uuid.alias }
    }
    const contentId = reqData.uuid.id

    const processed = processResponse(reqData)
    const processedData = processed.data as any
    const allLinks = extractLinks(processedData.value?.children, [])

    const prettyLinks =
      allLinks.length < 1 ? {} : await request(endpoint, idsQuery(allLinks))

    return { contentId, alias, ...processed, prettyLinks }
  } catch (e) {
    return { error: 'Error while fetching data: ' + (e.message ?? e), alias }
  }
}
