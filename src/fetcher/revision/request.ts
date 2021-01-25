import { request } from 'graphql-request'

import { convertState } from '../convert-state'
import { createTitle } from '../create-title'
import {
  QueryResponse,
  Instance,
  ArticleRevision,
  VideoRevision,
} from '../query-types'
import { revisionQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { EntityTypes, ErrorPage, RevisionPage } from '@/data-types'

export async function requestRevision(
  revisionId: number,
  instance: Instance
): Promise<RevisionPage | ErrorPage> {
  const variables = {
    id: revisionId,
  }

  const { uuid } = await request<{ uuid: QueryResponse }>(
    endpoint,
    revisionQuery,
    variables
  )

  const cacheKey = `/${instance}/${revisionId}`
  const title = createTitle(uuid, instance)

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
        metaDescription: '',
      },
      cacheKey,
    }
  }

  return {
    kind: 'error',
    errorData: {
      code: 404,
      message: `Something went wrong, this is not a revision!`,
    },
  }
}
