import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorCourseDocument,
  EditorRowsDocument,
} from '@editor/types/editor-plugins'
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

// ALWAYS start requestPath with slash
export async function requestPage(
  requestPath: string,
  instance: Instance
): Promise<RequestPageData> {
  const response = await request<MainUuidQuery, MainUuidQueryVariables>(
    endpoint,
    dataQuery,
    {
      alias: { instance, path: requestPath },
    }
  )
  const uuid = response.uuid
  const authorization = response.authorization as AuthorizationPayload
  if (!uuid) return { kind: 'not-found' }

  // tmp: return Course when CoursePage is requested
  if (uuid.__typename === UuidType.CoursePage) {
    return requestPage(`/${uuid.course.id}/${uuid.id}-slug`, instance)
  }

  // no content for comments
  if (uuid.__typename === UuidType.Comment) return { kind: 'not-found' }

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
  const title = createTitle(uuid, instance)
  const metaImage = getMetaImage(uuid.alias)

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
      secondaryMenuData: secondaryMenuData,
      breadcrumbsData: secondaryMenuData ? undefined : breadcrumbsData,
      authorization,
    }
  }

  const { licenseId } = uuid

  const sharedEntityData = {
    id: uuid.id,
    alias: uuid.alias,
    trashed: uuid.trashed,
    title: uuid.title,
    licenseId,
    content,
    isUnrevised: !uuid.currentRevision,
    unrevisedRevisions: uuid.revisions?.totalCount,
  }

  const sharedMetadata = {
    title,
    metaImage,
    metaDescription:
      uuid.currentRevision?.metaDescription ?? getMetaDescription(content),
    dateCreated: uuid.date,
    dateModified: uuid.currentRevision?.date,
  }

  if (uuid.__typename === UuidType.Article) {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        ...sharedEntityData,
        typename: UuidType.Article,
        schemaData: {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        },
      },
      metaData: {
        ...sharedMetadata,
        contentType: 'article',
        metaDescription: uuid.currentRevision?.metaDescription
          ? uuid.currentRevision?.metaDescription
          : getArticleMetaDescription(content),
      },
      horizonData,
      breadcrumbsData,
      authorization,
    }
  }

  if (uuid.__typename === UuidType.Course) {
    // unfortunately currently we don't know which course page is selected at this point

    const coursePageId = requestPath.split('/').at(-1)?.split('-')[0]
    const coursePages = (content as unknown as EditorCourseDocument).state.pages
    if (!coursePages || !coursePages.length) return { kind: 'not-found' }

    const coursePage = coursePageId
      ? coursePages.find((page) => page.id === coursePageId)
      : coursePages[0]

    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        ...sharedEntityData,
        typename: UuidType.Course,
        title: coursePage?.title ?? uuid.title,
        schemaData: {
          wrapWithItemType: 'http://schema.org/Article',
          useArticleTag: true,
          setContentAsSection: true,
        },
      },
      metaData: {
        ...sharedMetadata,
        contentType: 'course',
      },
      horizonData,
      breadcrumbsData,
      authorization,
    }
  }

  if (uuid.__typename === UuidType.Video) {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        ...sharedEntityData,
        typename: UuidType.Video,
        content: [
          {
            plugin: EditorPluginType.Video,
            state: {
              src: uuid.currentRevision?.url ?? '',
              alt: uuid.currentRevision?.title ?? '',
            },
          },
          ...(content ? [content] : []),
        ],
        schemaData: {
          wrapWithItemType: 'http://schema.org/VideoObject',
        },
      },
      metaData: {
        ...sharedMetadata,
        contentType: 'video',
      },
      horizonData,
      breadcrumbsData,
      authorization,
    }
  }

  if (uuid.__typename === UuidType.Applet) {
    return {
      kind: 'single-entity',
      newsletterPopup: false,
      entityData: {
        typename: UuidType.Applet,
        ...sharedEntityData,
        content: [
          {
            plugin: EditorPluginType.Geogebra,
            state: uuid.currentRevision?.url ?? '',
          },
          ...(content ? [content] : []),
        ],
        schemaData: {
          wrapWithItemType: 'http://schema.org/VideoObject',
        },
      },
      metaData: {
        ...sharedMetadata,
        contentType: 'applet',
      },
      horizonData,
      breadcrumbsData,
      authorization,
    }
  }

  return {
    kind: 'not-found', // unknown content type
  }
}
