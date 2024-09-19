import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorScMcExerciseDocument } from '@editor/types/editor-plugins'
import { shuffleArray } from '@serlo/frontend/src/helper/shuffle-array'
import { Fragment, useEffect, useState } from 'react'
import type { Element } from 'slate'

import {
  ScMcExerciseRenderer,
  ScMcExerciseRendererProps,
} from './renderer/renderer'
import { StaticSlate } from '../text/static-components/static-slate'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function ScMcExerciseStaticRenderer({
  state,
  id,
  isPrintMode,
  renderExtraAnswerContent,
  noShuffle,
}: EditorScMcExerciseDocument & {
  isPrintMode?: boolean
  renderExtraAnswerContent?: ScMcExerciseRendererProps['renderExtraAnswerContent']
  noShuffle?: true
}) {
  const [shuffledAnswers, setShuffledAnswers] = useState(state.answers)

  useEffect(() => {
    setShuffledAnswers(
      renderExtraAnswerContent || noShuffle
        ? state.answers
        : shuffleArray(state.answers)
    )
  }, [state.answers, renderExtraAnswerContent, noShuffle])

  const answers = shuffledAnswers
    .slice(0)
    .map(({ isCorrect, feedback, content }, i) => {
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
        key: content.id ?? feedback.id ?? `sm-mc-answer-${id}-${i}`,
      }
    })

  return (
    <Fragment key={id}>
      <ScMcExerciseRenderer
        isSingleChoice={!!state.isSingleChoice}
        answers={answers}
        isPrintMode={isPrintMode}
        renderExtraAnswerContent={renderExtraAnswerContent}
      />
    </Fragment>
  )
}
