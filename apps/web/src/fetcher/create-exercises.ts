import type {
  EditorExerciseDocument,
  EditorExerciseGroupDocument,
} from '@editor/package'

import { MainUuidType } from './query-types'
import { UuidType } from '@/data-types'
import { parseDocumentString } from '@/helper/parse-document-string'
import { unwrapEditorContent } from '@/serlo-editor-integration/convert-editor-response-to-state'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' }>,
  '__typename' | 'instance' | 'taxonomyTerms'
>

export function createExercise(
  uuid: BareExercise
): EditorExerciseDocument | undefined {
  if (!uuid.currentRevision?.content) return undefined

  const { templateContent } = unwrapEditorContent(
    UuidType.Exercise,
    uuid.currentRevision.content
  )

  const exercise = {
    ...(parseDocumentString(templateContent) as EditorExerciseDocument),
    serloContext: {
      uuid: uuid.id,
      revisionId: uuid.currentRevision.id,
      trashed: uuid.trashed,
      grouped: false,
      unrevisedRevisions: uuid.revisions?.totalCount,
      licenseId: uuid.licenseId,
    },
  }

  return exercise
}

export function createExerciseGroup(
  uuid: Omit<
    Extract<MainUuidType, { __typename: 'ExerciseGroup' }>,
    'date' | 'taxonomyTerms'
  >
): EditorExerciseGroupDocument | undefined {
  if (!uuid.currentRevision?.content) return undefined

  const { templateContent } = unwrapEditorContent(
    UuidType.ExerciseGroup,
    uuid.currentRevision.content
  )

  return {
    ...(parseDocumentString(templateContent) as EditorExerciseGroupDocument),
    serloContext: {
      uuid: uuid.id,
      trashed: uuid.trashed,
      unrevisedRevisions: uuid.revisions?.totalCount,
      licenseId: uuid.licenseId,
    },
  }
}
