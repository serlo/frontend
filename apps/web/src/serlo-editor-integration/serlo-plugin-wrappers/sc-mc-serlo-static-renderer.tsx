import { ScMcExerciseRendererAnswer } from '@editor/plugins/sc-mc-exercise/renderer/renderer'
import { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
import { EditorScMcExerciseDocument } from '@editor/types/editor-plugins'
import { useContext } from 'react'

import { isPrintMode } from '@/components/print-mode'
import { RevisionViewContext } from '@/contexts/revision-view-context'

export function ScMcSerloStaticRenderer(props: EditorScMcExerciseDocument) {
  const isRevisionView = useContext(RevisionViewContext)

  return (
    <ScMcExerciseStaticRenderer
      {...props}
      isPrintMode={isPrintMode}
      renderExtraAnswerContent={renderRevisionExtra}
    />
  )

  function renderRevisionExtra(
    answer: ScMcExerciseRendererAnswer,
    hasFeedback?: boolean
  ) {
    if (!isRevisionView || !hasFeedback) return null
    return (
      <div className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-200 py-2">
        {answer.isCorrect && (
          <span className="mx-side text-sm font-bold">[✅]</span>
        )}
        {answer.feedback}
      </div>
    )
  }
}
