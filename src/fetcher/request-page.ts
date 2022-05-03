import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { convertState } from './convert-state'
import { createBreadcrumbs } from './create-breadcrumbs'
import { createExercise, createExerciseGroup } from './create-exercises'
import { createHorizon } from './create-horizon'
import { createInlineLicense } from './create-inline-license'
import { getMetaImage, getMetaDescription } from './create-meta-data'
import { createNavigation } from './create-navigation'
import { buildTaxonomyData } from './create-taxonomy'
import { createTitle } from './create-title'
import {
  Instance,
  MainPageQuery,
  MainPageQueryVariables,
} from './graphql-types/operations'
import { dataQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { RequestPageData } from '@/data-types'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

// ALWAYS start alias with slash
export async function requestPage(
  alias: string,
  instance: Instance
): Promise<RequestPageData> {
  const response = await request<MainPageQuery, MainPageQueryVariables>(
    endpoint,
    dataQuery,
    {
      alias: { instance, path: alias },
    }
  )
  const uuid = response.uuid
  const authorization = response.authorization as AuthorizationPayload
  if (!uuid) return { kind: 'not-found' }
  // Can be deleted if CFWorker redirects those for us
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
      kind: 'redirect',
      target:
        uuid.alias && uuid.alias.startsWith('/entity/repository/compare')
          ? uuid.alias
          : `/entity/repository/compare/0/${uuid.id}`,
    }
  }

  if (uuid.__typename == 'Comment') return { kind: 'not-found' } // no content for comments

  if (uuid.__typename === 'Course') {
    const firstPage = uuid.pages.filter(
      (page) => page.currentRevision !== null
    )[0]?.alias
    if (firstPage) {
      return await requestPage(firstPage, instance)
    } else {
      const pages = uuid.pages.map((page) => {
        return {
          title: page.currentRevision?.title ?? '',
          url: !hasSpecialUrlChars(page.alias!) ? page.alias! : `/${page.id}`,
          noCurrentRevision: !page.currentRevision,
        }
      })

      return {
        // show warning if no pages exist or are reviewed yet
        kind: 'single-entity',
        newsletterPopup: false,
        entityData: {
          id: uuid.id,
          alias: uuid.alias ?? undefined,
          typename: uuid.__typename,
          title: uuid.currentRevision?.title ?? '',
          categoryIcon: 'course',
          inviteToEdit: true,
          isUnrevised: !uuid.currentRevision,
          courseData: {
            id: uuid.id,
            title: uuid.currentRevision?.title ?? '',
            pages,
            index: 0,
          },
        },
        metaData: {
          title: uuid.currentRevision?.title ?? '',
          contentType: 'course',
        },
        authorization,
      }
    }
  }

  if (uuid.__typename === 'Solution') {
    return await requestPage(`/${uuid.exercise.id}`, instance)
  }

  const secondaryNavigationData = createNavigation(uuid)
  const breadcrumbsData = createBreadcrumbs(uuid)
  const horizonData = instance == 'de' ? createHorizon() : undefined
  const cacheKey = `/${instance}${alias}`
  const title = createTitle(uuid, instance)
  const metaImage = getMetaImage(uuid.alias ? uuid.alias : undefined)

  // Special case for event history, User profiles are requested in user/request.ts
  if (uuid.__typename === 'User') {
    return {
      kind: 'user/events',
      userData: {
        id: uuid.id,
        title: uuid.username,
        alias: uuid.alias ?? undefined,
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
      authorization,
    }
  }

  if (uuid.__typename === 'Exercise' || uuid.__typename === 'GroupedExercise') {
    const exercise = [createExercise(uuid)]
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
        typename: uuid.__typename,
        trashed: uuid.trashed,
        content: exercise,
        inviteToEdit: true,
        unrevisedRevisions: uuid.revisions?.totalCount,
        isUnrevised: !uuid.currentRevision,
      },
      newsletterPopup: false,
      breadcrumbsData:
        uuid.__typename == 'GroupedExercise'
          ? [
              {
                label:
                  getInstanceDataByLang(instance).strings.entities
                    .exerciseGroup,
                url: uuid.exerciseGroup?.alias,
              },
            ]
          : breadcrumbsData,
      metaData: {
        title,
        contentType:
          uuid.__typename === 'Exercise' ? 'text-exercise' : 'groupedexercise',
        metaImage,
        metaDescription: getMetaDescription(exercise),
      },
      horizonData,
      cacheKey,
      authorization,
    }
  }

  if (uuid.__typename === 'ExerciseGroup') {
    const exercise = [createExerciseGroup(uuid)]
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
        typename: uuid.__typename,
        content: exercise,
        inviteToEdit: true,
        unrevisedRevisions: uuid.revisions?.totalCount,
        isUnrevised: !uuid.currentRevision,
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
      authorization,
    }
  }

  const content = convertState(uuid.currentRevision?.content)

  if (uuid.__typename === 'Event') {
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
        trashed: uuid.trashed,
        typename: uuid.__typename,
        content,
        isUnrevised: false,
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
      authorization,
    }
  }

  if (uuid.__typename === 'Page') {
    return {
      kind: 'single-entity',
      newsletterPopup: true,
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
        trashed: uuid.trashed,
        typename: uuid.__typename,
        revisionId: uuid.currentRevision?.id,
        title: uuid.currentRevision?.title ?? '',
        content,
        isUnrevised: !uuid.currentRevision,
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
      authorization,
    }
  }

  const licenseData = uuid.license

  if (uuid.__typename === 'Article') {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
        trashed: uuid.trashed,
        typename: uuid.__typename,
        title: uuid.currentRevision?.title ?? uuid.revisions?.nodes[0]?.title,
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
        isUnrevised: !uuid.currentRevision,
      },
      metaData: {
        title,
        contentType: 'article',
        metaImage,
        metaDescription: uuid.currentRevision?.metaDescription
          ? uuid.currentRevision?.metaDescription
          : getMetaDescription(content),
        dateCreated: uuid.date,
        dateModified: uuid.currentRevision?.date,
      },
      horizonData,
      cacheKey,
      breadcrumbsData,
      authorization,
    }
  }

  if (uuid.__typename === 'Video') {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
        trashed: uuid.trashed,
        typename: uuid.__typename,
        title: uuid.currentRevision?.title ?? '',
        content: [
          {
            type: 'video',
            src: uuid.currentRevision?.url!,
            license: createInlineLicense(uuid.license),
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
        isUnrevised: !uuid.currentRevision,
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
      authorization,
    }
  }

  if (uuid.__typename === 'Applet') {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias ?? undefined,
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
        isUnrevised: !uuid.currentRevision,
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
      authorization,
    }
  }

  if (uuid.__typename === 'CoursePage') {
    const pagesToShow =
      uuid.course && uuid.course.pages
        ? uuid.course.pages.filter(
            (page) =>
              page.alias &&
              page.currentRevision &&
              !page.currentRevision.trashed &&
              page.currentRevision.title &&
              page.currentRevision.title !== ''
          )
        : []

    let currentPageIndex = -1
    const pages = pagesToShow.map((page, i) => {
      const active = page.id === uuid.id
      if (active) {
        currentPageIndex = i
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
        alias: uuid.alias ?? undefined,
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
        categoryIcon: 'coursePage',
        inviteToEdit: true,
        courseData: {
          id: uuid.course.id,
          title: uuid.course.currentRevision?.title ?? '',
          pages,
          index: currentPageIndex,
        },
        unrevisedRevisions: uuid.revisions?.totalCount,
        unrevisedCourseRevisions: uuid.course.revisions?.totalCount,
        isUnrevised: !uuid.currentRevision,
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
      authorization,
    }
  }

  return {
    kind: 'not-found', // unknown content type
  }
}
