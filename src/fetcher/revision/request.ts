import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { revisionQuery } from './query'
import { convertState } from '../convert-state'
import { createExercise, createSolution } from '../create-exercises'
import { createTitle } from '../create-title'
import {
  Instance,
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from '../graphql-types/operations'
import { endpoint } from '@/api/endpoint'
import { PageNotFound, RevisionPage, UuidRevType, UuidType } from '@/data-types'

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

  if (!uuid)
    return {
      kind: 'not-found',
    }

  const authorization = response.authorization as AuthorizationPayload

  const cacheKey = `/${instance}/${revisionId}`

  if (
    uuid.__typename === UuidRevType.Article ||
    uuid.__typename === UuidRevType.Page ||
    uuid.__typename === UuidRevType.CoursePage ||
    uuid.__typename === UuidRevType.Video ||
    uuid.__typename === UuidRevType.Event ||
    uuid.__typename === UuidRevType.Applet ||
    uuid.__typename === UuidRevType.GroupedExercise ||
    uuid.__typename === UuidRevType.Exercise ||
    uuid.__typename === UuidRevType.ExerciseGroup ||
    uuid.__typename === UuidRevType.Solution ||
    uuid.__typename === UuidRevType.Course
  ) {
    const isExercise =
      uuid.__typename === UuidRevType.Exercise ||
      uuid.__typename === UuidRevType.GroupedExercise

    const title = createTitle(uuid, instance)

    const thisExercise = isExercise
      ? [
          createExercise({
            ...uuid,
            license: uuid.repository.license,
            currentRevision: {
              content: uuid.content,
              id: uuid.id,
              date: uuid.date,
            },
            revisions: { totalCount: 0 },
          }),
        ]
      : null

    const currentExercise =
      isExercise && uuid.repository.currentRevision
        ? [
            createExercise({
              ...uuid,
              license: uuid.repository.license,
              currentRevision: uuid.repository.currentRevision,
              revisions: { totalCount: 0 },
            }),
          ]
        : null

    const thisSolution =
      uuid.__typename === UuidRevType.Solution
        ? [
            createSolution({
              ...uuid,
              repository: {
                ...uuid.repository,
                currentRevision: { content: uuid.content, id: uuid.id },
              },
            }),
          ]
        : null
    const currentSolution =
      uuid.__typename === UuidRevType.Solution ? [createSolution(uuid)] : null

    const getParentId = () => {
      if (uuid.__typename === UuidRevType.GroupedExercise)
        return uuid.repository.exerciseGroup.id
      if (uuid.__typename === UuidRevType.Solution) {
        const exercise = uuid.repository.exercise
        if (exercise.__typename === UuidType.GroupedExercise)
          return exercise.exerciseGroup?.id
        return exercise.id
      }
      return uuid.repository.id
    }

    const getPositionInGroup = () => {
      if (uuid.__typename === UuidRevType.Solution) {
        const exercise = uuid.repository.exercise
        if (exercise.__typename === UuidType.GroupedExercise) {
          const pos = exercise.exerciseGroup?.exercises.findIndex(
            (ex) => ex.id === exercise.id
          )
          return pos && pos > -1 ? pos : undefined
        }
      }
      if (uuid.__typename === UuidRevType.GroupedExercise) {
        const pos = uuid.repository.exerciseGroup.exercises.findIndex(
          (ex) => ex.id === uuid.repository.id
        )
        return pos > -1 ? pos : undefined
      }
      return undefined
    }

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
          parentId: getParentId(),
          previousRevisionId: getPreviousRevisionId(),
          positionInGroup: getPositionInGroup(),
        },
        typename: uuid.__typename as UuidRevType,
        thisRevision: {
          id: uuid.id,
          trashed: uuid.trashed,
          title: Object.hasOwn(uuid, 'title') ? uuid.title : undefined,
          metaTitle: Object.hasOwn(uuid, 'metaTitle')
            ? uuid.metaTitle
            : undefined,
          metaDescription: Object.hasOwn(uuid, 'metaDescription')
            ? uuid.metaDescription
            : undefined,
          content: thisExercise || thisSolution || convertState(uuid.content),
          url: Object.hasOwn(uuid, 'url') ? uuid.url : undefined,
        },
        currentRevision: {
          id: uuid.repository.currentRevision?.id,
          title:
            currentRevision && Object.hasOwn(currentRevision, 'title')
              ? currentRevision.title
              : undefined,
          metaTitle:
            currentRevision && Object.hasOwn(currentRevision, 'metaTitle')
              ? currentRevision.metaTitle
              : undefined,
          metaDescription:
            currentRevision && Object.hasOwn(currentRevision, 'metaDescription')
              ? currentRevision.metaDescription
              : undefined,
          content:
            currentExercise ||
            currentSolution ||
            convertState(uuid.repository.currentRevision?.content),
          url:
            currentRevision && Object.hasOwn(currentRevision, 'url')
              ? currentRevision.url
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
      cacheKey,
      authorization,
    }
  }

  return {
    kind: 'not-found',
  }
}
