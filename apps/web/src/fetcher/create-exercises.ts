import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import {
  EditorExerciseDocument,
  EditorTemplateExerciseGroupDocument,
} from '@editor/types/editor-plugins'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { MainUuidType } from './query-types'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' | 'GroupedExercise' }>,
  'exerciseGroup' | '__typename' | 'instance'
>

export function createExercise(
  uuid: BareExercise
): EditorExerciseDocument | undefined {
  if (!uuid.currentRevision?.content) return undefined

  const exercise = {
    ...(parseDocumentString(
      uuid.currentRevision.content
    ) as EditorExerciseDocument),
    serloContext: {
      uuid: uuid.id,
      revisionId: uuid.currentRevision.id,
      trashed: uuid.trashed,
      grouped: false,
      unrevisedRevisions: uuid.revisions?.totalCount,
      licenseId: uuid.license.id,
    },
  }

  return exercise
}

export function createExerciseGroup(
  uuid: Omit<
    Extract<MainUuidType, { __typename: 'ExerciseGroup' }>,
    'date' | 'taxonomyTerms'
  >
): EditorTemplateExerciseGroupDocument | undefined {
  if (!uuid.currentRevision?.content) return undefined

  const exercises = uuid.exercises
    .map(createExercise)
    .filter(
      (exercise) => exercise && !exercise.serloContext?.trashed
    ) as EditorExerciseDocument[]

  return {
    plugin: TemplatePluginType.TextExerciseGroup,
    state: {
      // @ts-expect-error not sure why string is expected here
      content: parseDocumentString(uuid.currentRevision.content),
      exercises,
    },
    serloContext: {
      uuid: uuid.id,
      trashed: uuid.trashed,
      unrevisedRevisions: uuid.revisions.totalCount,
      license: uuid.license,
    },
  }
}
