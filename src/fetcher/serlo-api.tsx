import { request } from 'graphql-request'

import {
  EntityTypeWithTitle,
  EntityTypeWithValue,
  TaxonomyTermEntity,
} from './create-data'
import { extractLinks, extractLinksFromNav, walkIdNodes } from './extract-links'
import { getMetaDescription } from './get-meta-description'
import { processResponse, ResponseDataQuickFix } from './process-response'
import { dataQuery, idQuery, idsQuery, QueryResponseFetched } from './query'
import { endpoint } from '@/api/endpoint'
import { PrettyLinksContextValue } from '@/contexts/pretty-links-context'
import {
  PageData,
  BreadcrumbsData,
  SecondaryNavigationData,
  EntityData,
  EntityPageBase,
  ProcessedResponseTaxonomy,
  FrontendContentNode,
} from '@/data-types'
import { horizonData } from '@/data/horizon'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

interface MenuData {
  title: string
  url: string
}

export async function fetchContent(
  alias: string,
  redirect: boolean,
  origin: string
) {
  try {
    if (redirect && /^\/[\d]+$/.test(alias)) {
      // redirect id to alias
      const response = await request<{ uuid: QueryResponseFetched }>(
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
    const reqData = await request<{ uuid: QueryResponseFetched }>(
      endpoint,
      QUERY
    )

    // compat: redirect first page of course
    if (
      reqData.uuid.__typename === 'Course' &&
      Array.isArray(reqData.uuid.pages)
    ) {
      const filtered = reqData.uuid.pages.filter((page) => page.alias !== null)
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
    const dataWithValue = (processed.data as unknown) as EntityTypeWithValue
    if (dataWithValue?.value) {
      //TODO: investigate
      //@ts-expect-error
      walkIdNodes(dataWithValue.value.children, (node, id) => {
        contentLinks.push(id)
      })
    }

    //TODO: investigate this mess
    const dataEx = (processed.data as unknown) as TaxonomyTermEntity

    const exerciseLinks = extractLinks(
      dataEx.exercises as FrontendContentNode[],
      []
    )

    const metaNavLinks = extractLinksFromNav(processed.navigation as MenuData[])

    const allLinks = [...contentLinks, ...exerciseLinks, ...metaNavLinks]

    const prettyLinks =
      allLinks.length < 1
        ? undefined
        : await request<PrettyLinksContextValue>(endpoint, idsQuery(allLinks))

    const checkForSpecialUrls = (id: number, alias?: string) => {
      if (!alias || hasSpecialUrlChars(alias)) {
        return `/${id}`
      } else {
        return alias
      }
    }

    const resolveIdToAlias = (id: number) => {
      if (prettyLinks === undefined) return undefined

      const prettyLink = prettyLinks[`uuid${id}`]?.alias
      return checkForSpecialUrls(id, prettyLink)
    }

    //TODO: needs investigation
    // @ts-expect-error
    const buildPageData: () => PageData = () => {
      let breadcrumbsData: BreadcrumbsData | undefined = undefined

      if (
        processed.breadcrumbs &&
        !(processed.contentType === 'Page' && processed.navigation)
      ) {
        // Shorten breadcrumbs
        const shortened: BreadcrumbsData = []
        processed.breadcrumbs.map((entry, i, arr) => {
          const maxItems = 4
          const overflow = arr.length > maxItems
          const itemsToRemove = arr.length - maxItems
          const ellipsesItem = overflow && i == 2

          if (overflow && i > 2 && i < 1 + itemsToRemove) return
          // special case
          if (arr.length - itemsToRemove > 4 && i === 1) return
          if (ellipsesItem) {
            shortened.push({ label: '', ellipsis: true })
          } else {
            shortened.push(entry)
          }
        })
        breadcrumbsData = shortened
      }

      let secondaryNavigationData:
        | SecondaryNavigationData
        | undefined = undefined

      const type = ((processed.data as unknown) as ResponseDataQuickFix)?.type

      if (
        processed.navigation &&
        !(
          processed.contentType === 'TaxonomyTerm' &&
          (type === 'topicFolder' || type === 'curriculumTopicFolder')
        )
      ) {
        secondaryNavigationData = processed.navigation.map((entry) => {
          const id = parseInt(entry.url.substring(1))
          return {
            title: entry.title,
            url: resolveIdToAlias(id),
            active: id === contentId,
          }
        })
      }

      function getMetaContentType() {
        const { contentType } = processed
        //match legacy content types that are used by google custom search
        if (processed.contentType === undefined) return ''
        if (processed.contentType === 'Exercise') return 'text-exercise'
        if (processed.contentType === 'CoursePage') return 'course-page'

        const type = ((processed.data as unknown) as ResponseDataQuickFix).type
        if (type === 'topicFolder' || type === 'curriculumTopicFolder')
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

      const basePage: EntityPageBase = {
        breadcrumbsData,
        secondaryNavigationData,
        metaData: {
          title: processed.title,
          contentType: getMetaContentType(),
          metaDescription: getMetaDescription(processed),
          metaImage: getMetaImage(),
        },
        horizonData: processed.horizonIndices.map(
          (index) => horizonData[index]
        ),
        cacheKey: alias,
        newsletterPopup: !!(processed.data && processed.contentType === 'Page'),
      }

      if (processed.contentType === 'TaxonomyTerm') {
        //TODO: help?
        const processedTax = (processed as unknown) as ProcessedResponseTaxonomy

        const taxonomyData = {
          id: contentId,
          title: processedTax.data.title,
          description: processedTax.data.description?.children,
          subterms: processedTax.data.children?.map((child) => {
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
          exercisesContent: processedTax.data.exercises?.map(
            (exercise) => exercise.children
          ),
          articles: processedTax.data.links.articles,
          exercises: processedTax.data.links.exercises,
          videos: processedTax.data.links.videos,
          courses: processedTax.data.links.courses,
          applets: processedTax.data.links.applets,
        }
        return {
          ...basePage,
          kind: 'taxonomy',
          taxonomyData,
        }
      }

      const entityData: EntityData = { id: contentId }

      //TODO: help?
      entityData.title = ((processed.data as unknown) as EntityTypeWithTitle)?.title

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

      //TODO: Should not be nessesary
      entityData.content = ((processed.data as unknown) as EntityTypeWithValue)?.value?.children

      if (processed.contentType !== 'Page') {
        entityData.inviteToEdit = true
      }
      if (entityData.content) {
        // resolve prettylinks
        // walk through content and replace links with prettyfied version
        walkIdNodes(entityData.content, (node, id) => {
          //@ts-expect-error
          node.href = resolveIdToAlias(id)
        })
      }

      entityData.licenseData = processed.license

      interface CourseData {
        courseTitle: string
        pages: {
          alias: 'string'
          id: number
          currentRevision: {
            title: string
          }
        }[]
        nextPageUrl?: string
      }

      if (processed.contentType === 'CoursePage') {
        const processedCourseData = (processed.data as unknown) as CourseData
        let currentPageIndex = -1
        const pages = processedCourseData.pages.map((page, i) => {
          const active = page.id === contentId
          if (active) {
            currentPageIndex = i + 1
          }
          return {
            title: page.currentRevision?.title ?? '',
            url: checkForSpecialUrls(page.id, page.alias),
            active,
          }
        })
        entityData.courseData = {
          title: processedCourseData.courseTitle,
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
    return {
      error: `Error while fetching data: ${(e as Error).message ?? e}`,
      alias,
    }
  }
}
