import type {
  EditorExerciseDocument,
  EditorExerciseGroupDocument,
} from '@editor/package'

import { MainUuidType } from './query-types'
import { parseDocumentString } from '@/helper/parse-document-string'

type BareExercise = Omit<
  Extract<MainUuidType, { __typename: 'Exercise' }>,
  '__typename' | 'instance' | 'taxonomyTerms'
>

export function createExercise(
  uuid: BareExercise
): EditorExerciseDocument | undefined {
  if (!uuid.currentRevision?.content) return undefined

  return parseDocumentString(
    uuid.currentRevision.content
  ) as EditorExerciseDocument
}

export function createExerciseGroup(
  uuid: Omit<
    Extract<MainUuidType, { __typename: 'ExerciseGroup' }>,
    'date' | 'taxonomyTerms'
  >
): EditorExerciseGroupDocument | undefined {
  if (!uuid.currentRevision?.content) return undefined

  return parseDocumentString(
    uuid.currentRevision.content
  ) as EditorExerciseGroupDocument
}
