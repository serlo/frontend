import { AuthorizationPayload } from '@serlo/authorization'
import { request } from 'graphql-request'

import { convertState } from '../convert-state'
import { createExercise, createSolution } from '../create-exercises'
import { createTitle } from '../create-title'
import {
  Instance,
  ArticleRevision,
  VideoRevision,
  QueryResponseRevision,
  GroupedExercise,
  Exercise,
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

  const { uuid, authorization } = await request<{
    uuid: QueryResponseRevision
    authorization: AuthorizationPayload
  }>(endpoint, revisionQuery, variables)

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
    const isExercise =
      uuid.__typename === 'ExerciseRevision' ||
      uuid.__typename === 'GroupedExerciseRevision'

    const thisExercise = isExercise
      ? [
          createExercise({
            ...uuid,
            license: uuid.repository.license,
            currentRevision: { content: uuid.content },
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
            }),
          ]
        : null

    const thisSolution =
      uuid.__typename === 'SolutionRevision'
        ? [
            createSolution({
              __typename: 'Solution',
              id: uuid.id,
              trashed: uuid.trashed,
              license: uuid.license,
              instance: uuid.instance,
              currentRevision: { content: uuid.content },
              exercise: { id: -1 },
            }),
          ]
        : null
    const currentSolution =
      uuid.__typename === 'SolutionRevision'
        ? [
            createSolution({
              __typename: 'Solution',
              id: uuid.id,
              trashed: uuid.trashed,
              license: uuid.license,
              instance: uuid.instance,
              currentRevision: uuid.repository.currentRevision,
              exercise: { id: -1 },
            }),
          ]
        : null

    const getParentId = () => {
      if (uuid.__typename === 'GroupedExerciseRevision')
        return uuid.repository.exerciseGroup.id
      if (uuid.__typename === 'SolutionRevision') {
        const exercise = uuid.repository.exercise as unknown as
          | GroupedExercise
          | Exercise
        if (exercise.__typename === 'GroupedExercise')
          return exercise.exerciseGroup.id
        return exercise.id
      }
      return uuid.repository.id
    }

    const getPositionInGroup = () => {
      if (uuid.__typename === 'SolutionRevision') {
        const exercise = uuid.repository.exercise as unknown as GroupedExercise
        if (exercise.__typename === 'GroupedExercise') {
          const pos = exercise.exerciseGroup.exercises.findIndex(
            (ex) => ex.id === exercise.id
          )
          return pos > -1 ? pos : undefined
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
    kind: 'error',
    errorData: {
      code: 404,
      message: `Something went wrong, this is not a revision!`,
    },
  }
}
