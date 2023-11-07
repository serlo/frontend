import { useEffect, useState } from 'react'
import type { Element } from 'slate'

import {
  ScMcExerciseRenderer,
  ScMcExerciseRendererProps,
} from './renderer/renderer'
import { StaticSlate } from '../text/static-components/static-slate'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { shuffleArray } from '@/helper/shuffle-array'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorScMcExerciseDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function ScMcExerciseStaticRenderer({
  state,
  isPrintMode,
  idBase,
  onEvaluate,
  renderExtraAnswerContent,
}: EditorScMcExerciseDocument & {
  idBase: string
  isPrintMode?: boolean
  onEvaluate: ScMcExerciseRendererProps['onEvaluate']
  renderExtraAnswerContent: ScMcExerciseRendererProps['renderExtraAnswerContent']
}) {
  const [shuffledAnswers, setShuffledAnswers] = useState(state.answers)

  useEffect(() => {
    if (!renderExtraAnswerContent) {
      setShuffledAnswers(shuffleArray(state.answers))
    }
  }, [state.answers, renderExtraAnswerContent])

  const answers = shuffledAnswers
    .slice(0)
    .map(({ isCorrect, feedback, content }) => {
      const hasFeedback = !isEmptyTextDocument(feedback)
      const unwrappedFeedback = hasFeedback
        ? (feedback.state as Element[])?.[0].children
        : []

      return {
        isCorrect,
        feedback: hasFeedback ? (
          <StaticSlate element={unwrappedFeedback} />
        ) : null,
        content: isEmptyTextDocument(content) ? null : (
          <StaticRenderer document={content} />
        ),
      }
    })

  return (
    <ScMcExerciseRenderer
      isSingleChoice={!!state.isSingleChoice}
      idBase={idBase}
      answers={answers}
      isPrintMode={isPrintMode}
      onEvaluate={onEvaluate}
      renderExtraAnswerContent={renderExtraAnswerContent}
    />
  )
}
