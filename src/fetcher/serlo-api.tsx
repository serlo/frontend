import { request } from 'graphql-request'

import { serloDomain } from '../helper/serlo-domain'
import { extractLinks, extractLinksFromNav, walkIdNodes } from './extract-links'
import { processResponse } from './process-response'
import { dataQuery, idQuery, idsQuery } from './query'
import {
  PageData,
  BreadcrumbsData,
  BreadcrumbLinkEntry,
  SecondaryNavigationData,
  EntityData,
  EntityPageBase,
  TaxonomyData,
} from '@/data-types'
import { horizonData } from '@/data/horizon'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

export const endpoint = `https://api.${serloDomain}/graphql`

interface MenuData {
  title: string
  url: string
}

// TODO: needs type declaration
export async function fetchContent(
  alias: string,
  redirect: any,
  origin: string
) {
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

    const contentLinks: number[] = []
    if (processed.data.value) {
      walkIdNodes(processed.data.value.children, (node, id) => {
        contentLinks.push(id)
      })
    }

    // todo: rewrite this extractor as well
    const exerciseLinks = extractLinks(processed.data.exercises, [])

    const metaNavLinks = extractLinksFromNav(processed.navigation as MenuData[])

    const allLinks = [...contentLinks, ...exerciseLinks, ...metaNavLinks]

    const prettyLinks =
      allLinks.length < 1 ? {} : await request(endpoint, idsQuery(allLinks))

    const checkForSpecialUrls = (alias: string, id: number) => {
      if (!alias || hasSpecialUrlChars(alias)) {
        return `/${id}`
      } else {
        return alias
      }
    }

    const resolveIdToAlias = (id: number) => {
      const prettyLink = prettyLinks[`uuid${id}`]?.alias
      return checkForSpecialUrls(prettyLink, id)
    }

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

      if (
        processed.navigation &&
        !(
          processed.contentType === 'TaxonomyTerm' &&
          (processed.data.type === 'topicFolder' ||
            processed.data.type === 'curriculumTopicFolder')
        )
      ) {
        secondaryNavigationData = (processed.navigation as any[]).map(
          (entry: any) => {
            const id = parseInt(entry.url.substring(1))
            return {
              title: entry.title as string,
              url: resolveIdToAlias(id),
              active: id === parseInt(contentId),
            }
          }
        )
      }

      function getMetaContentType() {
        const { contentType } = processed
        //match legacy content types that are used by google custom search
        if (contentType === undefined) return ''
        if (contentType === 'Exercise') return 'text-exercise'
        if (contentType === 'CoursePage') return 'course-page'
        if (
          processed.data.type === 'topicFolder' ||
          processed.data.type === 'curriculumTopicFolder'
        )
          return 'topic-folder'
        if (contentType === 'TaxonomyTerm') return 'topic'
        //Article, Video, Applet, Page
        return contentType.toLowerCase()
      }

      function getMetaImage() {
        const subject = alias ? alias.split('/')[1] : 'default'
        let imageSrc = 'serlo.jpg'

        switch (subject) {
          case 'mathe':
            imageSrc = 'mathematik.jpg'
            break
          case 'nachhaltigkeit':
            imageSrc = 'nachhaltigkeit.jpg'
            break
          case 'biologie':
            imageSrc = 'biologie.jpg'
            break
        }

        return `${origin}/_assets/img/meta/${imageSrc}`
      }

      function getMetaDescription() {
        if (processed.contentType === 'TaxonomyTerm') return
        const { data } = processed

        if (!data) return

        const hasDescription =
          data.metaDescription && data.metaDescription.length > 10
        if (hasDescription) return data.metaDescription as string

        if (data.value === undefined || data.value.children === undefined)
          return

        const slice = data.value.children.slice(0, 10)
        const stringified = JSON.stringify(slice)
        const regexp = /"text":"(.)*?"/g
        const matches = stringified.match(regexp)
        const longFallback = matches
          ? matches.map((str) => str.substring(8, str.length - 1)).join('')
          : ''
        if (longFallback.length < 50) return

        const softCutoff = 135
        const fallback =
          longFallback.substr(
            0,
            softCutoff + longFallback.substr(softCutoff).indexOf(' ')
          ) + ' …'
        const description = hasDescription ? data.metaDescription : fallback
        return description as string
      }

      const basePage: EntityPageBase = {
        breadcrumbsData,
        secondaryNavigationData,
        metaData: {
          title: processed.title,
          contentType: getMetaContentType(),
          metaDescription: getMetaDescription(),
          metaImage: getMetaImage(),
        },
        horizonData: processed.horizonIndices.map(
          (index) => horizonData[index]
        ),
        cacheKey: alias,
        newsletterPopup: processed.data && processed.contentType === 'Page',
      }

      if (processed.contentType === 'TaxonomyTerm') {
        const taxonomyData: TaxonomyData = {
          id: contentId,
          title: processed.data.title,
          description: processed.data.description?.children,
          subterms: processed.data.children.map((child: any) => {
            return {
              title: child.title,
              url: child.url,
              description: child.description?.children,
              articles: child.links.articles,
              exercises: child.links.exercises,
              videos: child.links.videos,
              courses: child.links.courses,
              applets: child.links.applets,
              folders: child.links.subfolders,
            }
          }),
          exercisesContent: processed.data.exercises?.map(
            (exercise: any) => exercise.children
          ),
          articles: processed.data.links.articles,
          exercises: processed.data.links.exercises,
          videos: processed.data.links.videos,
          courses: processed.data.links.courses,
          applets: processed.data.links.applets,
        }
        return { ...basePage, kind: 'taxonomy', taxonomyData }
      }

      const entityData: EntityData = { id: contentId }
      entityData.title = processed.data?.title
      if (processed.contentType === 'Article') {
        entityData.categoryIcon = 'article'
        entityData.schemaData = {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        }
      }
      if (processed.contentType === 'Video') {
        entityData.categoryIcon = 'video'
      }
      if (
        processed.contentType === 'Video' ||
        processed.contentType === 'Applet'
      ) {
        entityData.schemaData = {
          wrapWithItemType: 'http://schema.org/VideoObject',
        }
      }
      entityData.content = processed.data?.value?.children
      if (processed.contentType !== 'Page') {
        entityData.inviteToEdit = true
      }
      if (entityData.content) {
        // resolve prettylinks
        // walk through content and replace links with prettyfied version
        walkIdNodes(entityData.content, (node, id) => {
          ;(node as any).href = resolveIdToAlias(id)
        })
      }
      entityData.licenseData = processed.license
      if (processed.contentType === 'CoursePage') {
        let currentPageIndex = -1
        const pages = processed.data.pages.map((page: any, i: number) => {
          const active = page.id === contentId
          if (active) {
            currentPageIndex = i + 1
          }
          return {
            title: page.currentRevision?.title ?? '',
            url: checkForSpecialUrls(page.alias, page.id),
            active,
          }
        })
        entityData.courseData = {
          title: processed.data.courseTitle,
          pages,
          nextPageUrl: pages[currentPageIndex]?.url,
        }
      }

      return {
        ...basePage,
        kind: 'single-entity',
        entityData,
      }
    }

    return {
      pageData: buildPageData(),
    }
  } catch (e) {
    return { error: `Error while fetching data: ${e.message ?? e}`, alias }
  }
}
