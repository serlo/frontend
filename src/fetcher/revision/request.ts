import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { convertState } from '../convert-state'
import { createExercise, createSolution } from '../create-exercises'
import { createTitle } from '../create-title'
import {
  Instance,
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from '../graphql-types/operations'
import {
  ArticleRevision,
  VideoRevision,
  GroupedExercise,
  Exercise,
} from '../query-types'
import { revisionQuery } from './query'
import { endpoint } from '@/api/endpoint'
import { EntityTypes, PageNotFound, RevisionPage } from '@/data-types'

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
    const isExercise =
      uuid.__typename === 'ExerciseRevision' ||
      uuid.__typename === 'GroupedExerciseRevision'

    const title = createTitle(uuid, instance)

    const thisExercise = isExercise
      ? [
          createExercise({
            ...uuid,
            license: uuid.repository.license,
            currentRevision: {
              content: uuid.content,
              /*id: uuid.id,*/
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
      uuid.__typename === 'SolutionRevision'
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
      uuid.__typename === 'SolutionRevision' ? [createSolution(uuid)] : null

    const getParentId = () => {
      if (uuid.__typename === 'GroupedExerciseRevision')
        return uuid.repository.exerciseGroup.id
      if (uuid.__typename === 'SolutionRevision') {
        const exercise = uuid.repository.exercise as unknown as
          | GroupedExercise
          | Exercise
        if (exercise.__typename === 'GroupedExercise')
          return exercise.exerciseGroup?.id
        return exercise.id
      }
      return uuid.repository.id
    }

    const getPositionInGroup = () => {
      if (uuid.__typename === 'SolutionRevision') {
        const exercise = uuid.repository.exercise as unknown as GroupedExercise
        if (exercise.__typename === 'GroupedExercise') {
          const pos = exercise.exerciseGroup?.exercises.findIndex(
            (ex) => ex.id === exercise.id
          )
          return pos && pos > -1 ? pos : undefined
        }
      }
      if (uuid.__typename === 'GroupedExerciseRevision') {
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
      const previousRevision = (
        olderRevNodes as { trashed: boolean; id: number }[]
      ).find(
        (rev) => !rev.trashed && rev.id !== uuid.repository.currentRevision?.id
      )
      return previousRevision?.id
    }

    const _typeNoRevision = uuid.__typename.replace('Revision', '')
    const type = (_typeNoRevision.charAt(0).toLowerCase() +
      _typeNoRevision.slice(1)) as EntityTypes

    return {
      kind: 'revision',
      newsletterPopup: false,
      revisionData: {
        type,
        repository: {
          id: uuid.repository.id,
          alias: uuid.repository.alias || undefined,
          parentId: getParentId(),
          previousRevisionId: getPreviousRevisionId(),
          positionInGroup: getPositionInGroup(),
        },
        typename: uuid.__typename,
        thisRevision: {
          id: uuid.id,
          trashed: uuid.trashed,
          title: (uuid as ArticleRevision).title,
          metaTitle: (uuid as ArticleRevision).metaTitle,
          metaDescription: (uuid as ArticleRevision).metaDescription,
          content: thisExercise || thisSolution || convertState(uuid.content),
          url: (uuid as VideoRevision).url,
        },
        currentRevision: {
          id: uuid.repository.currentRevision?.id,
          title: (uuid as ArticleRevision).repository.currentRevision?.title,
          metaTitle: (uuid as ArticleRevision).repository.currentRevision
            ?.metaTitle,
          metaDescription: (uuid as ArticleRevision).repository.currentRevision
            ?.metaDescription,
          content:
            currentExercise ||
            currentSolution ||
            convertState(uuid.repository.currentRevision?.content),
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
      authorization,
    }
  }

  return {
    kind: 'not-found',
  }
}
