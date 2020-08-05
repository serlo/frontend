import { render } from 'external/legacy_render'
import { request } from 'graphql-request'

import { createBreadcrumbs } from './create-breadcrumbs'
import { createExercise, createExerciseGroup } from './create-exercises'
import { getMetaImage, getMetaDescription } from './create-meta-data'
import { createNavigation } from './create-navigation'
import { buildTaxonomyData } from './create-taxonomy'
import { createTitle } from './create-title'
import { prettifyLinks } from './prettify-links'
import { dataQuery, QueryResponse } from './query'
import { endpoint } from '@/api/endpoint'
import { PageData, FrontendContentNode } from '@/data-types'
import { horizonData } from '@/data/horizon_de'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { parseLanguageSubfolder, getLandingData } from '@/helper/feature-i18n'
import { convert } from '@/schema/convert-edtr-io-state'
import { convertLegacyState } from '@/schema/convert-legacy-state'

export async function fetchPageData(raw_alias: string): Promise<PageData> {
  try {
    const { alias, instance } = parseLanguageSubfolder(raw_alias)

    if (alias == '/') {
      return { kind: 'landing', landingData: getLandingData(instance) }
    }
    const pageData = await apiRequest(alias, instance)
    await prettifyLinks(pageData)
    return pageData
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes("Cannot read property 'path' of null")
      ? 404
      : 500
    return { kind: 'error', errorData: { code, message } }
  }
}

async function apiRequest(alias: string, instance: string): Promise<PageData> {
  const QUERY = dataQuery(
    /^\/[\d]+$/.test(alias)
      ? 'id: ' + alias.substring(1)
      : `alias: { instance: ${instance}, path: "${alias}"}`
  )

  const { uuid } = await request<{ uuid: QueryResponse }>(endpoint, QUERY)

  if (uuid.__typename === 'Course') {
    const firstPage = uuid.pages[0]?.alias
    if (firstPage) {
      return await apiRequest(firstPage, instance)
    } else {
      return { kind: 'error', errorData: { code: 404 } }
    }
  }

  const secondaryNavigationData = createNavigation(uuid)
  const breadcrumbsData = createBreadcrumbs(uuid)
  const horizonData = instance == 'de' ? buildHorizonData() : undefined
  const cacheKey = `/${instance}${alias}`
  const title = createTitle(uuid)
  const metaImage = getMetaImage(alias)

  if (uuid.__typename === 'TaxonomyTerm') {
    return {
      kind: 'taxonomy',
      newsletterPopup: false,
      metaData: {
        title,
        metaImage,
        contentType:
          uuid.type === 'topicFolder' || uuid.type === 'curriculumTopicFolder'
            ? 'topic-folder'
            : 'topic',
      },
      cacheKey,
      breadcrumbsData,
      secondaryNavigationData,
      taxonomyData: buildTaxonomyData(uuid),
    }
  }

  if (uuid.__typename === 'Exercise' || uuid.__typename === 'GroupedExercise') {
    const exercise = [createExercise(uuid)]
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        content: exercise,
        inviteToEdit: true,
      },
      newsletterPopup: false,
      breadcrumbsData,
      metaData: {
        title,
        contentType:
          uuid.__typename === 'Exercise' ? 'text-exercise' : 'groupedexercise',
        metaImage,
        metaDescription: getMetaDescription(exercise),
      },
      horizonData,
      cacheKey,
    }
  }

  if (uuid.__typename === 'ExerciseGroup') {
    const exercise = [createExerciseGroup(uuid)]
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        content: exercise,
        inviteToEdit: true,
      },
      newsletterPopup: false,
      breadcrumbsData,
      metaData: {
        title,
        contentType: 'exercisegroup',
        metaImage,
        metaDescription: getMetaDescription(exercise),
      },
      horizonData,
      cacheKey,
    }
  }

  const content = convertState(uuid.currentRevision?.content)

  if (uuid.__typename === 'Event') {
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        content,
      },
      newsletterPopup: false,
      horizonData,
      metaData: {
        title,
        contentType: 'event',
        metaImage,
        metaDescription: getMetaDescription(content),
      },
      cacheKey,
    }
  }

  if (uuid.__typename === 'Page') {
    return {
      kind: 'single-entity',
      newsletterPopup: true,
      entityData: {
        id: uuid.id,
        title: uuid.currentRevision?.title ?? '',
        content,
      },
      metaData: {
        title,
        contentType: 'page',
        metaImage,
        metaDescription: getMetaDescription(content),
      },
      horizonData,
      cacheKey,
      secondaryNavigationData,
      breadcrumbsData: secondaryNavigationData ? undefined : breadcrumbsData,
    }
  }

  const licenseData = uuid.license

  if (uuid.__typename === 'Article') {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        title: uuid.currentRevision?.title ?? '',
        content,
        licenseData,
        schemaData: {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        },
        categoryIcon: 'article',
        inviteToEdit: true,
      },
      metaData: {
        title,
        contentType: 'article',
        metaImage,
        metaDescription: uuid.currentRevision?.metaDescription
          ? uuid.currentRevision?.metaDescription
          : getMetaDescription(content),
      },
      horizonData,
      cacheKey,
      breadcrumbsData,
    }
  }

  if (uuid.__typename === 'Video') {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        title: uuid.currentRevision?.title ?? '',
        content: [
          {
            type: 'video',
            src: uuid.currentRevision?.url!,
          },
          ...content,
        ],
        categoryIcon: 'video',
        inviteToEdit: true,
        schemaData: {
          wrapWithItemType: 'http://schema.org/VideoObject',
        },
        licenseData,
      },
      metaData: {
        title,
        contentType: 'video',
        metaImage,
        metaDescription: getMetaDescription(content),
      },
      horizonData,
      cacheKey,
      breadcrumbsData,
    }
  }

  if (uuid.__typename === 'Applet') {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        title: uuid.currentRevision?.title ?? '',
        content: [
          {
            type: 'geogebra',
            id: uuid.currentRevision?.url ?? '',
          },
          ...content,
        ],
        inviteToEdit: true,
        schemaData: {
          wrapWithItemType: 'http://schema.org/VideoObject',
        },
        licenseData,
      },
      metaData: {
        title,
        contentType: 'applet',
        metaImage,
        metaDescription: uuid.currentRevision?.metaDescription
          ? uuid.currentRevision?.metaDescription
          : getMetaDescription(content),
      },
      horizonData,
      cacheKey,
      breadcrumbsData,
    }
  }

  if (uuid.__typename === 'CoursePage') {
    let currentPageIndex = -1
    const pages = uuid.course.pages.flatMap((page, i) => {
      const active = page.id === uuid.id
      if (active) {
        currentPageIndex = i + 1
      }
      if (!page.alias) {
        return []
      }
      return [
        {
          title: page.currentRevision?.title ?? '',
          url: !hasSpecialUrlChars(page.alias) ? page.alias : `/${page.id}`,
          active,
        },
      ]
    })
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        title: uuid.currentRevision?.title ?? '',
        content,
        licenseData,
        schemaData: {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        },
        categoryIcon: 'article',
        inviteToEdit: true,
        courseData: {
          title: uuid.course.currentRevision?.title ?? '',
          pages,
          nextPageUrl: pages[currentPageIndex]?.url,
        },
      },
      metaData: {
        title,
        contentType: 'course-page',
        metaImage,
        metaDescription: getMetaDescription(content),
      },
      horizonData,
      cacheKey,
      breadcrumbsData,
    }
  }

  return { kind: 'error', errorData: { code: 200 } }
}

function buildHorizonData() {
  const entries = Object.keys(horizonData)
  const selected = []

  while (selected.length < 3) {
    const index = parseInt(entries[Math.floor(Math.random() * entries.length)])
    if (Math.random() > horizonData[index].frequency) continue
    if (selected.indexOf(horizonData[index]) === -1)
      selected.push(horizonData[index])
  }
  return selected
}

export function convertState(raw: string | undefined): FrontendContentNode[] {
  if (!raw) return []

  if (raw?.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML).children
  } else if (raw?.startsWith('{')) {
    // edtrio
    return convert(JSON.parse(raw))
  } else {
    // raw as text
    return [{ type: 'p', children: [{ type: 'text', text: raw ?? '' }] }]
  }
}
