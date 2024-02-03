import { useContext } from 'react'

import { BlankDraggableAnswer } from './components/blank-draggable-answer'
import { BlankRendererInput } from './components/blank-renderer-input'
import { DroppableBlank } from './components/droppable-blank'
import { FillInTheBlanksContext } from './context/blank-context'

interface BlankRendererStaticProps {
  blankId: string
}

/**
 * Renders either an input element (where user can type into)
 * or a drop area (where user can drop draggable answers),
 * depending on the mode
 */
export function BlankRendererStatic({ blankId }: BlankRendererStaticProps) {
  const context = useContext(FillInTheBlanksContext)
  if (context === null) return null

  const draggableSolution = [...context.locationOfDraggables.value].find(
    (entry) => entry[1] === blankId
  )
  const draggableId = draggableSolution?.[0] ?? null
  const draggable = context.draggables.find(
    (draggable) => draggable.draggableId === draggableId
  )
  const draggableText = draggable?.text ?? ''

  const feedback = context.feedbackForBlanks.value
  const isAnswerCorrect = feedback.get(blankId)?.isCorrect

  function handleChange() {
    context?.isFeedbackVisible.set(false)
  }

  return context.mode === 'typing' ? (
    <BlankRendererInput
      blankId={blankId}
      context={context}
      isAnswerCorrect={isAnswerCorrect}
      onChange={handleChange}
    />
  ) : (
    <DroppableBlank blankId={blankId}>
      {draggableId ? (
        <BlankDraggableAnswer
          text={draggableText}
          draggableId={draggableId}
          isAnswerCorrect={isAnswerCorrect}
        />
      ) : null}
    </DroppableBlank>
  )
}
