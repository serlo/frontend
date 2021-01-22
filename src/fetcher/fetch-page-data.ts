import * as GraphQL from '@serlo/api'
import { request } from 'graphql-request'

import { render } from '../../external/legacy_render'
import { createBreadcrumbs } from './create-breadcrumbs'
import { createExercise, createExerciseGroup } from './create-exercises'
import { createHorizon } from './create-horizon'
import { getMetaImage, getMetaDescription } from './create-meta-data'
import { createNavigation } from './create-navigation'
import { buildTaxonomyData } from './create-taxonomy'
import { createTitle } from './create-title'
import { prettifyLinks } from './prettify-links'
import {
  dataQuery,
  QueryResponse,
  licenseDetailsQuery,
  ArticleRevision,
  VideoRevision,
  Instance,
} from './query'
import { endpoint } from '@/api/endpoint'
import {
  PageData,
  FrontendContentNode,
  EntityTypes,
  LicenseDetailPage,
} from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'
import { convert } from '@/schema/convert-edtr-io-state'
import { convertLegacyState } from '@/schema/convert-legacy-state'

export async function fetchPageData(raw_alias: string): Promise<PageData> {
  try {
    const { alias, instance } = parseLanguageSubfolder(raw_alias)
    if (alias.startsWith('/license/detail/')) {
      const id = parseInt(alias.split('license/detail/')[1])
      return await apiLicensePageRequest(id, instance)
    }

    const pageData = await apiRequest(alias, instance as Instance)
    await prettifyLinks(pageData)
    return pageData
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return { kind: 'error', errorData: { code, message } }
  }
}

async function apiRequest(
  alias: string,
  instance: Instance
): Promise<PageData> {
  const isId = /^\/[\d]+$/.test(alias) //e.g. /1565
  const variables = isId
    ? {
        id: parseInt(alias.substring(1), 10),
      }
    : {
        alias: {
          instance,
          path: alias,
        },
      }

  const { uuid } = await request<{ uuid: QueryResponse }>(
    endpoint,
    dataQuery,
    variables
  )

  if (uuid === null) {
    return {
      kind: 'error',
      errorData: {
        code: 404,
        message: 'Content not found.',
      },
    }
  }

  if (uuid.__typename === 'Course') {
    const firstPage = uuid.pages[0]?.alias
    if (firstPage) {
      return await apiRequest(firstPage, instance)
    } else {
      return { kind: 'error', errorData: { code: 404 } }
    }
  }

  if (uuid.__typename === 'Solution') {
    return await apiRequest(`/${uuid.exercise.id}`, instance)
  }

  const secondaryNavigationData = createNavigation(uuid)
  const breadcrumbsData = createBreadcrumbs(uuid)
  const horizonData = instance == 'de' ? createHorizon() : undefined
  const cacheKey = `/${instance}${alias}`
  const title = createTitle(uuid, instance)
  const metaImage = getMetaImage(uuid.alias ? uuid.alias : undefined)

  if (uuid.__typename === 'User') {
    const placeholder = JSON.stringify({
      plugin: 'text',
      state: [
        {
          type: 'p',
          children: {
            text:
              'This is where we display the description on a the production server.',
          },
        },
      ],
    })
    const description = uuid.description
      ? uuid.description === 'NULL'
        ? convertState(placeholder)
        : convertState(uuid.description)
      : undefined
    return {
      kind: 'user/profile',
      newsletterPopup: false,
      userData: {
        id: uuid.id,
        username: uuid.username,
        description: description,
        lastLogin: uuid.lastLogin,
        activeReviewer: uuid.activeReviewer,
        activeAuthor: uuid.activeAuthor,
        activeDonor: uuid.activeDonor,
      },
    }
  }

  if (uuid.__typename === 'TaxonomyTerm') {
    return {
      kind: 'taxonomy',
      taxonomyData: buildTaxonomyData(uuid),
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
    }
  }

  if (uuid.__typename === 'Exercise' || uuid.__typename === 'GroupedExercise') {
    const exercise = [createExercise(uuid)]
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        typename: uuid.__typename,
        content: exercise,
        inviteToEdit: true,
        unrevisedRevisions: uuid.revisions?.totalCount,
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
        typename: uuid.__typename,
        content: exercise,
        inviteToEdit: true,
        unrevisedRevisions: uuid.revisions?.totalCount,
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

  if (
    uuid.__typename === 'ArticleRevision' ||
    uuid.__typename === 'PageRevision' ||
    uuid.__typename === 'CoursePageRevision' ||
    uuid.__typename === 'VideoRevision' ||
    uuid.__typename === 'EventRevision' ||
    uuid.__typename === 'AppletRevision' ||
    uuid.__typename === 'GroupedExerciseRevision' ||
    uuid.__typename === 'ExerciseRevision' ||
    uuid.__typename === 'ExerciseGroupRevision' ||
    uuid.__typename === 'SolutionRevision' ||
    uuid.__typename === 'CourseRevision'
  ) {
    return {
      kind: 'revision',
      newsletterPopup: false,
      revisionData: {
        type: uuid.__typename
          .replace('Revision', '')
          .toLowerCase() as EntityTypes,
        repositoryId: uuid.repository.id,
        typename: uuid.__typename,
        thisRevision: {
          id: uuid.id,
          title: (uuid as ArticleRevision).title,
          metaTitle: (uuid as ArticleRevision).metaTitle,
          metaDescription: (uuid as ArticleRevision).metaDescription,
          content: convertState(uuid.content),
          url: (uuid as VideoRevision).url,
        },
        currentRevision: {
          id: uuid.repository.currentRevision?.id,
          title: (uuid as ArticleRevision).repository.currentRevision?.title,
          metaTitle: (uuid as ArticleRevision).repository.currentRevision
            ?.metaTitle,
          metaDescription: (uuid as ArticleRevision).repository.currentRevision
            ?.metaDescription,
          content: convertState(uuid.repository.currentRevision?.content),
          url: (uuid as VideoRevision).repository.currentRevision?.url,
        },
        changes: (uuid as ArticleRevision).changes,
        user: {
          ...uuid.author,
        },
        date: uuid.date,
      },
      metaData: {
        title,
        contentType: 'revision',
        metaImage,
        metaDescription: '',
      },
      cacheKey,
      breadcrumbsData,
    }
  }

  const content = convertState(uuid.currentRevision?.content)

  if (uuid.__typename === 'Event') {
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        trashed: uuid.trashed,
        typename: uuid.__typename,
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
        trashed: uuid.trashed,
        typename: uuid.__typename,
        revisionId: uuid.currentRevision?.id,
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
        trashed: uuid.trashed,
        typename: uuid.__typename,
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
        unrevisedRevisions: uuid.revisions?.totalCount,
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
        trashed: uuid.trashed,
        typename: uuid.__typename,
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
        unrevisedRevisions: uuid.revisions?.totalCount,
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
        trashed: uuid.trashed,
        typename: uuid.__typename,
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
        unrevisedRevisions: uuid.revisions?.totalCount,
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
    const pagesToShow = uuid.course.pages.filter(
      (page) =>
        page.alias &&
        !page.trashed &&
        !page.currentRevision?.trashed &&
        page.currentRevision?.title &&
        page.currentRevision?.title !== ''
    )

    let currentPageIndex = -1
    const pages = pagesToShow.map((page, i) => {
      const active = page.id === uuid.id
      if (active) {
        currentPageIndex = i + 1
      }
      return {
        title: page.currentRevision?.title ?? '',
        url: !hasSpecialUrlChars(page.alias!) ? page.alias! : `/${page.id}`,
        active,
      }
    })
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        trashed: uuid.trashed,
        typename: uuid.__typename,
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
          id: uuid.course.id,
          title: uuid.course.currentRevision?.title ?? '',
          pages,
          nextPageUrl: pages[currentPageIndex]?.url,
        },
        unrevisedRevisions: uuid.revisions?.totalCount,
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

  return {
    kind: 'error',
    errorData: {
      code: 404,
      message: `Unknown content type!`,
    },
  }
}

async function apiLicensePageRequest(
  id: number,
  instance: string
): Promise<LicenseDetailPage> {
  const { license } = await request<{ license: GraphQL.License }>(
    endpoint,
    licenseDetailsQuery(id)
  )
  const horizonData = instance == 'de' ? createHorizon() : undefined

  return {
    kind: 'license-detail',
    licenseData: {
      content: convertState(license.content),
      title: license.title,
      iconHref: license.iconHref,
    },
    newsletterPopup: false,
    horizonData,
    metaData: {
      title: license.title,
      contentType: 'page',
    },
  }
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
