import { FillInTheBlanksStaticRenderer } from '@editor/plugins/fill-in-the-blanks-exercise/static'
import { EditorFillInTheBlanksExerciseDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'

import { useAB } from '@/contexts/ab'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'

export function FillInTheBlanksSerloStaticRenderer(
  props: EditorFillInTheBlanksExerciseDocument
) {
  const { asPath } = useRouter()
  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()

  return <FillInTheBlanksStaticRenderer {...props} onEvaluate={onEvaluate} />

  function onEvaluate(correct: boolean) {
    exerciseSubmission(
      {
        path: asPath,
        entityId,
        revisionId,
        result: correct ? 'correct' : 'wrong',
        type: 'blanks',
      },
      ab
    )
  }
}
