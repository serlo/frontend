import * as GraphQL from '@serlo/api'
import { request } from 'graphql-request'

import { render } from '../../external/legacy_render'
import { createBreadcrumbs } from './create-breadcrumbs'
import { createExercise, createExerciseGroup } from './create-exercises'
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
  User,
} from './query'
import { endpoint } from '@/api/endpoint'
import { PageData, FrontendContentNode, EntityTypes } from '@/data-types'
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
    if (alias.startsWith('/license/detail/')) {
      const id = parseInt(alias.split('license/detail/')[1])
      return await apiLicensePageRequest(id, instance)
    }

    const pageData = await apiRequest(alias, instance)
    await prettifyLinks(pageData)
    return pageData
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return { kind: 'error', errorData: { code, message } }
  }
}

async function apiRequest(alias: string, instance: string): Promise<PageData> {
  const { uuid } =
    alias.indexOf('user/profile') > -1
      ? ({
          uuid: {
            __typename: 'User',
            id: 73435,
            trashed: false,
            username: 'kathongi',
            alias: 'kathongi',
            date: '2017-04-03T08:19:03+02:00',
            lastLogin: '2020-08-12T10:24:32+02:00',
            description:
              '{"plugin":"rows","state":[{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Hey! Ich heiße Kathi und bin seit April 2017 bei Serlo Education. Ich habe Mathe und Wirtschaft Gymnasiallehramt an der LMU studiert und bin über ein Praktikum zu Serlo gekommen. "}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Ich bin bei Serlo für den Communityaufbau und die Begleitung unserer Teammitglieder zuständig, was mir sehr viel Spaß macht."}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/5a5e1e26e079d_be364fe222554361fd7d233642ca03b064324206.jpg","alt":"Kathi Radstorfer"}},"illustrating":true,"width":50}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Warum ich bei Serlo bin"}]},{"type":"p","children":[{"text":"Durch meine Mitarbeit bei Serlo möchte ich dazu beitragen, das soziale Ungleichgewicht im Bildungssektor ein Stück weit auszugleichen. Während meiner Schulzeit kam es leider manchmal zu finanziellen Engpässen, die mitunter sehr belastend sein konnten. Trotzdem habe ich mein Abitur als einzige in meiner Familie meistern können. Einen erfolgreichen Schulabschluss unabhängig vom Geldbeutel der Eltern wünsche ich mir daher für noch viel mehr Schüler*innen von Herzen!"}]},{"type":"h","level":2,"children":[{"text":"Meine Lieblingsformel"}]},{"type":"p","children":[{"text":"Meine Lieblingsformel ist die Euler\'sche Identität. So viele wichtige mathematische Zeichen und ein Zusammenhang, der erst im Studium schlüßig wurde:"}]},{"type":"p","children":[{"type":"math","src":"e^{i\\\\pi}+1=0\\\\;","inline":false,"children":[{"text":"e^{i\\\\pi}+1=0\\\\;"}]}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Wenn du Fragen an mich hast, kannst du mir gern einen Kommentar auf meinem Profil hinterlassen oder eine E-Mail an "},{"type":"a","href":"mailto:kathi@serlo.org","children":[{"text":"kathi@serlo.org"}]},{"text":" senden."}]}]}]}',
            activeDonor: false,
            instance: 'de', //TODO: Check types.
          },
        } as { uuid: User })
      : await request<{ uuid: QueryResponse }>(
          endpoint,
          dataQuery,
          /^\/[\d]+$/.test(alias)
            ? {
                id: parseInt(alias.substring(1), 10),
              }
            : {
                alias: {
                  instance,
                  path: alias,
                },
              }
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

  const secondaryNavigationData = createNavigation(uuid)
  const breadcrumbsData = createBreadcrumbs(uuid)
  const horizonData = instance == 'de' ? buildHorizonData() : undefined
  const cacheKey = `/${instance}${alias}`
  const title = createTitle(uuid)
  const metaImage = getMetaImage(uuid.alias ? uuid.alias : undefined)

  if (uuid.__typename === 'User') {
    return {
      kind: 'user/profile',
      newsletterPopup: false,
      userData: {
        username: uuid.username,
        description: uuid.description
          ? convertState(uuid.description)
          : undefined,
        lastLogin: uuid.lastLogin,
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

  /* Solutions should always be shown alongside the exercise
  if (uuid.__typename === 'Solution') {
    const solution = [createSolution(uuid)]
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        typename: uuid.__typename,
        content: solution,
        inviteToEdit: false,
      },
      newsletterPopup: false,
      breadcrumbsData,
      metaData: {
        title,
        contentType: 'solution',
        metaImage,
        metaDescription: '',
      },
      horizonData,
      cacheKey,
    }
  }*/

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
          id: uuid.author.id,
          username: uuid.author.username,
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
      (page) => page.alias && !page.trashed && !page.currentRevision?.trashed
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
      message: 'Content type not supported: ' + uuid.__typename,
    },
  }
}

async function apiLicensePageRequest(
  id: number,
  instance: string
): Promise<PageData> {
  const { license } = await request<{ license: GraphQL.License }>(
    endpoint,
    licenseDetailsQuery(id)
  )
  const horizonData = instance == 'de' ? buildHorizonData() : undefined

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
