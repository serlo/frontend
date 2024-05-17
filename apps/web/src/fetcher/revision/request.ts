import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorExerciseDocument } from '@editor/types/editor-plugins'
import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { revisionQuery } from './query'
import { createExercise } from '../create-exercises'
import { createTitle } from '../create-title'
import {
  Instance,
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from '../graphql-types/operations'
import { endpoint } from '@/api/endpoint'
import { PageNotFound, RevisionPage, UuidRevType } from '@/data-types'

export async function requestRevision(
  revisionId: number,
  instance: Instance
): Promise<RevisionPage | PageNotFound> {
  const variables = {
    id: revisionId,
  }

  const response = await request<RevisionUuidQuery, RevisionUuidQueryVariables>(
    endpoint,
    revisionQuery,
    variables
  )

  const uuid = response.uuid

  if (!uuid) return { kind: 'not-found' }

  const authorization = response.authorization as AuthorizationPayload

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
    const isExercise = uuid.__typename === UuidRevType.Exercise

    const title = createTitle(uuid, instance)

    const thisExercise = isExercise
      ? [
          createExercise({
            ...uuid,
            licenseId: uuid.repository.licenseId,
            currentRevision: {
              title: uuid.title,
              alias: uuid.alias,
              content: uuid.content,
              id: uuid.id,
              date: uuid.date,
            },
            revisions: { totalCount: 0, nodes: [] },
          }),
        ]
      : undefined

    const currentExercise =
      isExercise && uuid.repository.currentRevision
        ? [
            createExercise({
              ...uuid,
              licenseId: uuid.repository.licenseId,
              currentRevision: uuid.repository.currentRevision,
              revisions: { totalCount: 0, nodes: [] },
            }),
          ]
        : null

    // likely the previously accepted revision
    const getPreviousRevisionId = () => {
      const revNodes = uuid.repository.revisions?.nodes
      if (!revNodes) return
      const thisIndex = revNodes.findIndex((node) => node.id === uuid.id)
      const olderRevNodes = revNodes.slice(thisIndex + 1)
      let previousRevision = undefined
      // using for loop instead of find because of https://stackoverflow.com/a/50929986
      for (const rev of olderRevNodes) {
        if (!rev.trashed && rev.id !== uuid.repository.currentRevision?.id) {
          previousRevision = rev
          break
        }
      }
      return previousRevision?.id
    }

    const currentRevision = Object.hasOwn(uuid, 'repository')
      ? uuid.repository.currentRevision
      : undefined

    return {
      kind: 'revision',
      newsletterPopup: false,
      revisionData: {
        repository: {
          id: uuid.repository.id,
          alias: uuid.repository.alias,
          parentId: uuid.repository.id,
          previousRevisionId: getPreviousRevisionId(),
        },
        typename: uuid.__typename as UuidRevType,
        thisRevision: {
          id: uuid.id,
          trashed: uuid.trashed,
          title: Object.hasOwn(uuid, 'title') ? uuid.title : undefined,
          metaTitle: Object.hasOwn(uuid, 'metaTitle')
            ? uuid.metaTitle ?? undefined
            : undefined,
          metaDescription: Object.hasOwn(uuid, 'metaDescription')
            ? uuid.metaDescription ?? undefined
            : undefined,
          content: thisExercise
            ? (thisExercise as unknown as EditorExerciseDocument)
            : parseDocumentString(uuid.content),
          url: Object.hasOwn(uuid, 'url') ? uuid.url ?? undefined : undefined,
        },
        currentRevision: {
          id: uuid.repository.currentRevision?.id,
          title:
            currentRevision && Object.hasOwn(currentRevision, 'title')
              ? currentRevision.title
              : undefined,
          metaTitle:
            currentRevision && Object.hasOwn(currentRevision, 'metaTitle')
              ? currentRevision.metaTitle ?? ''
              : undefined,
          metaDescription:
            currentRevision && Object.hasOwn(currentRevision, 'metaDescription')
              ? currentRevision.metaDescription ?? ''
              : undefined,
          content: currentExercise
            ? (currentExercise as unknown as EditorExerciseDocument)
            : parseDocumentString(uuid.repository.currentRevision?.content),
          url:
            currentRevision && Object.hasOwn(currentRevision, 'url')
              ? currentRevision.url ?? ''
              : undefined,
        },
        changes: Object.hasOwn(uuid, 'changes') ? uuid.changes : undefined,
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
      authorization,
    }
  }

  return { kind: 'not-found' }
}
