import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorRowsDocument } from '@editor/types/editor-plugins'
import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { createBreadcrumbs } from './create-breadcrumbs'
import { createExerciseGroup, createExercise } from './create-exercises'
import { createHorizon } from './create-horizon'
import { createSecondaryMenu } from './create-secondary-menu'
import { buildTaxonomyData } from './create-taxonomy'
import { createTitle } from './create-title'
import {
  Instance,
  MainUuidQuery,
  MainUuidQueryVariables,
} from './graphql-types/operations'
import { getArticleMetaDescription } from './meta-data/get-article-meta-description'
import { getMetaDescription } from './meta-data/get-meta-description'
import { getMetaImage } from './meta-data/get-meta-image'
import { prettifyLinksInSecondaryMenu } from './prettify-links-state/prettify-links-in-secondary-menu'
import { prettifyLinksInState } from './prettify-links-state/prettify-links-in-state'
import { dataQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { RequestPageData, UuidRevType, UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'

// ALWAYS start alias with slash
export async function requestPage(
  alias: string,
  instance: Instance
): Promise<RequestPageData> {
  const response = await request<MainUuidQuery, MainUuidQueryVariables>(
    endpoint,
    dataQuery,
    {
      alias: { instance, path: alias },
    }
  )
  const uuid = response.uuid
  const authorization = response.authorization as AuthorizationPayload
  if (!uuid) return { kind: 'not-found' }

  if (uuid.__typename === UuidType.Comment) return { kind: 'not-found' } // no content for comments
  // users are not handled in uuid query any more
  if (uuid.__typename === UuidType.User) return { kind: 'not-found' }

  if (
    uuid.__typename === UuidRevType.Article ||
    uuid.__typename === UuidRevType.Page ||
    uuid.__typename === UuidRevType.CoursePage ||
    uuid.__typename === UuidRevType.Video ||
    uuid.__typename === UuidRevType.Event ||
    uuid.__typename === UuidRevType.Applet ||
    uuid.__typename === UuidRevType.Exercise ||
    uuid.__typename === UuidRevType.ExerciseGroup ||
    uuid.__typename === UuidRevType.Course
  ) {
    // redirect revisions
    // (can maybe be deleted if CFWorker redirects those for us)
    return {
      kind: 'redirect',
      target:
        uuid.alias && uuid.alias.startsWith('/entity/repository/compare')
          ? uuid.alias
          : `/entity/repository/compare/0/${uuid.id}`,
    }
  }

  const secondaryMenuData = await prettifyLinksInSecondaryMenu(
    createSecondaryMenu(uuid, instance)
  )
  const breadcrumbsData = createBreadcrumbs(uuid, instance)
  const horizonData = instance === Instance.De ? createHorizon() : undefined
  const cacheKey = `/${instance}${alias}`
  const title = createTitle(uuid, instance)
  const metaImage = getMetaImage(uuid.alias)

  if (uuid.__typename === UuidType.Course) {
    const firstPage = uuid.pages.filter(
      (page) => page.currentRevision !== null
    )[0]?.alias
    if (firstPage) {
      return await requestPage(firstPage, instance)
    } else {
      const pages = uuid.pages.map((page) => {
        return {
          id: page.id,
          title: page.currentRevision?.title ?? '',
          url: !hasSpecialUrlChars(page.alias) ? page.alias : `/${page.id}`,
          noCurrentRevision: !page.currentRevision,
        }
      })

      return {
        // show warning if no pages exist or are reviewed yet
        kind: 'single-entity',
        newsletterPopup: false,
        entityData: {
          id: uuid.id,
          alias: uuid.alias,
          typename: UuidType.Course,
          title: uuid.currentRevision?.title ?? '',
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
        breadcrumbsData,
      }
    }
  }

  if (uuid.__typename === UuidType.TaxonomyTerm) {
    return {
      kind: 'taxonomy',
      taxonomyData: buildTaxonomyData(uuid),
      newsletterPopup: false,
      metaData: {
        title,
        metaImage,
        contentType:
          uuid.type === TaxonomyTermType.ExerciseFolder
            ? 'topic-folder'
            : 'topic',
      },
      cacheKey,
      breadcrumbsData,
      secondaryMenuData: secondaryMenuData,
      authorization,
    }
  }

  if (uuid.__typename === UuidType.Exercise) {
    const exercise = createExercise(uuid)
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        typename: uuid.__typename as UuidType,
        trashed: uuid.trashed,
        content: exercise,
        unrevisedRevisions: uuid.revisions?.totalCount,
        isUnrevised: !uuid.currentRevision,
      },
      newsletterPopup: false,
      breadcrumbsData,
      metaData: {
        title,
        contentType: 'text-exercise',
        metaImage,
        metaDescription: getMetaDescription(exercise?.state.content),
      },
      horizonData,
      cacheKey,
      authorization,
    }
  }

  if (uuid.__typename === UuidType.ExerciseGroup) {
    const exerciseGroup = createExerciseGroup(uuid)
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.ExerciseGroup,
        content: exerciseGroup,
        unrevisedRevisions: uuid.revisions?.totalCount,
        isUnrevised: !uuid.currentRevision,
      },
      newsletterPopup: false,
      breadcrumbsData,
      metaData: {
        title,
        contentType: 'exercisegroup',
        metaImage,
        metaDescription: getMetaDescription(
          exerciseGroup?.state.content as unknown as EditorRowsDocument
        ),
      },
      horizonData,
      cacheKey,
      authorization,
    }
  }

  const content = (await prettifyLinksInState(
    uuid.currentRevision?.content
      ? parseDocumentString(uuid.currentRevision?.content)
      : undefined
  )) as EditorRowsDocument

  if (uuid.__typename === UuidType.Event) {
    return {
      kind: 'single-entity',
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.Event,
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

  if (uuid.__typename === UuidType.Page) {
    return {
      kind: 'single-entity',
      newsletterPopup: true,
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.Page,
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
      secondaryMenuData: secondaryMenuData,
      breadcrumbsData: secondaryMenuData ? undefined : breadcrumbsData,
      authorization,
    }
  }

  const { licenseId } = uuid

  if (uuid.__typename === UuidType.Article) {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.Article,
        title: uuid.currentRevision?.title ?? uuid.revisions?.nodes[0]?.title,
        content,
        licenseId,
        schemaData: {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        },
        unrevisedRevisions: uuid.revisions?.totalCount,
        isUnrevised: !uuid.currentRevision,
      },
      metaData: {
        title,
        contentType: 'article',
        metaImage,
        metaDescription: uuid.currentRevision?.metaDescription
          ? uuid.currentRevision?.metaDescription
          : getArticleMetaDescription(content),
        dateCreated: uuid.date,
        dateModified: uuid.currentRevision?.date,
      },
      horizonData,
      cacheKey,
      breadcrumbsData,
      authorization,
    }
  }

  if (uuid.__typename === UuidType.Video) {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.Video,
        title: uuid.currentRevision?.title ?? '',
        content: [
          {
            plugin: EditorPluginType.Video,
            state: {
              src: uuid.currentRevision?.url ?? '',
              alt: uuid.currentRevision?.title ?? '',
            },
            id: uuid.id as unknown as string,
          },
          ...(content ? [content] : []),
        ],
        schemaData: {
          wrapWithItemType: 'http://schema.org/VideoObject',
        },
        licenseId,
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

  if (uuid.__typename === UuidType.Applet) {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.Applet,
        title: uuid.currentRevision?.title ?? '',
        content: [
          {
            plugin: EditorPluginType.Geogebra,
            state: uuid.currentRevision?.url ?? '',
            id: uuid.id as unknown as string,
          },
          ...(content ? [content] : []),
        ],
        schemaData: {
          wrapWithItemType: 'http://schema.org/VideoObject',
        },
        licenseId,
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

  if (uuid.__typename === UuidType.CoursePage) {
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
        id: page.id,
        url: !hasSpecialUrlChars(page.alias) ? page.alias : `/${page.id}`,
        active,
      }
    })
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        id: uuid.id,
        alias: uuid.alias,
        trashed: uuid.trashed,
        typename: UuidType.CoursePage,
        title: uuid.currentRevision?.title ?? '',
        content,
        licenseId: uuid.course.licenseId,
        schemaData: {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        },
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
