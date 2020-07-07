import { request } from 'graphql-request'

import { serloDomain } from '../serlo-domain'
import { extractLinks, extractLinksFromNav } from './extract-links'
import { processResponse } from './process-response'
import { dataQuery, idQuery, idsQuery } from './query'

export const endpoint = `https://api.${serloDomain}/graphql`

interface MenuData {
  title: string
  url: string
}

// TODO: needs type declaration
export async function fetchContent(alias: string, redirect: any) {
  try {
    if (redirect && /^\/[\d]+$/.test(alias)) {
      // redirect id to alias
      const response = await request<{ uuid: any }>(
        endpoint,
        idQuery(parseInt(alias.substring(1)))
      )
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
    // TODO: needs better types
    const reqData = await request<{ uuid: any }>(endpoint, QUERY)
    // compat: redirect first page of course
    if (
      reqData.uuid.__typename === 'Course' &&
      Array.isArray(reqData.uuid.pages)
    ) {
      // TODO: needs type declaration
      const filtered = reqData.uuid.pages.filter(
        (page: any) => page.alias !== null
      )
      if (filtered.length > 0) {
        return { redirect: filtered[0].alias }
      }
    }
    if (redirect && reqData.uuid.alias) {
      const canonicalPath = decodeURIComponent(reqData.uuid.alias)
      if (alias !== canonicalPath) {
        return { redirect: canonicalPath }
      }
    }
    const contentId = reqData.uuid.id

    const processed = processResponse(reqData)

    const contentLinks = extractLinks(processed.data.value?.children, [])
    const exerciseLinks = extractLinks(processed.data.exercises, [])
    const metaNavLinks = extractLinksFromNav(processed.navigation as MenuData[])

    const allLinks = [...contentLinks, ...exerciseLinks, ...metaNavLinks]

    const prettyLinks =
      allLinks.length < 1 ? {} : await request(endpoint, idsQuery(allLinks))

    return { contentId, alias, ...processed, prettyLinks }
  } catch (e) {
    return { error: `Error while fetching data: ${e.message ?? e}`, alias }
  }
}
