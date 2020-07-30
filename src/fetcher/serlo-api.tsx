import { request } from 'graphql-request'

import { createBreadcrumbs } from './create-breadcrumbs'
import {
  EntityTypeWithTitle,
  EntityTypeWithValue,
  TaxonomyTermEntity,
  createData,
} from './create-data'
import { createNavigation } from './create-navigation'
import { walkIdNodes } from './extract-links'
import { getMetaDescription } from './get-meta-description'
import { ResponseDataQuickFix } from './process-response'
import { dataQuery, idsQuery, QueryResponse } from './query'
import { endpoint } from '@/api/endpoint'
import {
  PageData,
  EntityData,
  EntityPageBase,
  FrontendContentNode,
} from '@/data-types'
import { horizonData } from '@/data/horizon_de'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { parseLanguageSubfolder, getLandingData } from '@/helper/feature-i18n'
import { createTitle } from './create-title'

interface MenuData {
  title: string
  url: string
}

export async function fetchPageData(
  raw_alias: string,
  origin: string
): Promise<PageData> {
  try {
    const { alias, instance } = parseLanguageSubfolder(raw_alias)

    if (alias == '/') {
      return { kind: 'landing', landingData: getLandingData(instance) }
    }

    const QUERY = dataQuery(
      /^\/[\d]+$/.test(alias)
        ? 'id: ' + alias.substring(1)
        : `alias: { instance: ${instance}, path: "${alias}"}`
    )

    const reqData = await request<{ uuid: QueryResponse }>(endpoint, QUERY)

    // compat: load first page of course
    if (
      reqData.uuid.__typename === 'Course' &&
      Array.isArray(reqData.uuid.pages)
    ) {
      const filtered = reqData.uuid.pages.filter((page) => page.alias !== null)
      if (filtered.length > 0) {
        return await fetchPageData(`/${instance}${filtered[0].alias}`, origin)
      }
    }

    // prettify links

    const links: number[] = []

    // secondary navigation

    const secondaryNavigationData = createNavigation(reqData.uuid)

    if (secondaryNavigationData) {
      secondaryNavigationData.forEach((entry) => {
        if (entry.url) {
          if (/^\/[\d]+$/.test(entry.url)) {
            links.push(parseInt(entry.url.substring(1)))
          }
        }
      })
    }

    // breadcrumbs

    const breadcrumbsData =
      reqData.uuid.__typename === 'Page' && secondaryNavigationData
        ? undefined
        : createBreadcrumbs(reqData.uuid)

    /*


    */

    const prettyLinks =
      links.length < 1
        ? undefined
        : await request<{
            [key: string]: {
              alias: string
              instance: string
            }
          }>(endpoint, idsQuery(links))

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

    // after resolve

    if (secondaryNavigationData) {
      secondaryNavigationData.forEach((entry) => {
        if (entry.url) {
          const id = parseInt(entry.url.substring(1))
          if (!isNaN(id)) {
            entry.url = resolveIdToAlias(id)
            entry.active = id === reqData.uuid.id
          }
        }
      })
    }

    const content = createData(reqData.uuid)

    const basePage: EntityPageBase = {
      breadcrumbsData,
      secondaryNavigationData,
      metaData: {
        title: createTitle(reqData.uuid) ?? 'Serlo',
        contentType: getMetaContentType(),
        metaDescription: getMetaDescription(reqData.uuid),
        metaImage: getMetaImage(),
      },
      horizonData:
        instance == 'de'
          ? processed.horizonIndices.map((index) => horizonData[index])
          : undefined,
      cacheKey: alias,
      newsletterPopup: !!(processed.data && processed.contentType === 'Page'),
    }

    /*











    OOOOOOOOOOOOOOOOLD










    */

    const contentLinks: number[] = []
    const dataWithValue = (processed.data as unknown) as EntityTypeWithValue
    if (dataWithValue?.value) {
      //TODO: investigate
      walkIdNodes(dataWithValue.value.children, (_node, id) => {
        contentLinks.push(id)
      })
    }

    //TODO: investigate this mess
    const dataEx = (processed.data as unknown) as TaxonomyTermEntity

    const exerciseLinks: number[] = []
    if (dataEx.exercises) {
      for (const exercise of dataEx.exercises) {
        if (exercise) {
          walkIdNodes(
            exercise.children as FrontendContentNode[],
            (_node, id) => {
              exerciseLinks.push(id)
            }
          )
        }
      }
    }

    //TODO: needs investigation

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
      if (taxonomyData.exercisesContent) {
        for (const exercise of taxonomyData.exercisesContent) {
          walkIdNodes(exercise, (node, id) => {
            console.log(id, resolveIdToAlias(id))
            //@ts-expect-error
            node.href = resolveIdToAlias(id)
          })
        }
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
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes("Cannot read property 'path' of null")
      ? 404
      : 500
    return { kind: 'error', errorData: { code, message } }
  }
}
