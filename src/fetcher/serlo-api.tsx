import { request } from 'graphql-request'

import { serloDomain } from '../helper/serlo-domain'
import { extractLinks, extractLinksFromNav } from './extract-links'
import { processResponse } from './process-response'
import { dataQuery, idQuery, idsQuery } from './query'
import {
  PageData,
  BreadcrumbsData,
  BreadcrumbLinkEntry,
  SecondaryNavigationData,
} from '@/data-types'

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

    const buildPageData: () => PageData = () => {
      let breadcrumbsData: BreadcrumbsData | undefined = undefined

      if (
        processed.breadcrumbs &&
        !(processed.contentType === 'Page' && processed.navigation)
      ) {
        // Shorten breadcrumbs
        const shortened: BreadcrumbsData = []
        processed.breadcrumbs.map(
          (entry: BreadcrumbLinkEntry, i: number, arr: any) => {
            const maxItems = 4
            const overflow = arr.length > maxItems
            const itemsToRemove = arr.length - maxItems
            const ellipsesItem = overflow && i == 2

            if (overflow && i > 2 && i < 1 + itemsToRemove) return
            // special case
            if (arr.length - itemsToRemove > 4 && i === 1) return
            if (ellipsesItem) {
              shortened.push({ ellipsis: true })
            } else {
              shortened.push(entry)
            }
          }
        )
        breadcrumbsData = shortened
      }

      let secondaryNavigationData:
        | SecondaryNavigationData
        | undefined = undefined

      if (processed.navigation) {
        secondaryNavigationData = (processed.navigation as any[]).map(
          (entry: any) => {
            const id = entry.url.substring(1)
            const prettyLink = prettyLinks[`uuid${id}`]
            return {
              title: entry.title as string,
              url: prettyLink ? prettyLink.alias : entry.url,
              active: parseInt(id) === parseInt(contentId),
            }
          }
        )
      }

      return {
        kind:
          processed.contentType === 'TaxonomyTerm'
            ? 'taxonomy'
            : 'single-entity',
        breadcrumbsData,
        secondaryNavigationData,
      }
    }

    return {
      contentId,
      alias,
      ...processed,
      prettyLinks,
      pageData: buildPageData(),
    }
  } catch (e) {
    return { error: `Error while fetching data: ${e.message ?? e}`, alias }
  }
}
