import { BlanksTableStaticRenderer } from '@editor/plugins/blanks-table/static'
import type { EditorBlanksTableDocument } from '@editor/types/editor-plugins'
import { useRouter } from 'next/router'

import { useAB } from '@/contexts/ab'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'

export function BlanksTableSerloStaticRenderer(
  props: EditorBlanksTableDocument
) {
  const { asPath } = useRouter()
  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()

  return <BlanksTableStaticRenderer {...props} onEvaluate={onEvaluate} />

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
