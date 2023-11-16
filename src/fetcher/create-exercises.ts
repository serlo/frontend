import { MainUuidType } from './query-types'
import { parseDocumentString } from '@/serlo-editor/static-renderer/helper/parse-document-string'
import {
  EditorExerciseDocument,
  EditorTemplateExerciseGroupDocument,
} from '@/serlo-editor-integration/types/editor-plugins'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

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
