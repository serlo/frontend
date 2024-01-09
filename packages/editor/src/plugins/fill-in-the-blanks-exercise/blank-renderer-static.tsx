import { ChangeEventHandler, useContext } from 'react'

import type { FillInTheBlanksMode } from '.'
import { DraggableSolution } from './components/blank-solution'
import { DroppableBlank } from './components/droppable-blank'
import { FillInTheBlanksContext } from './context/blank-context'
import { setTextUserTypedIntoBlank } from './util/handlers'
import { cn } from '@/helper/cn'

interface BlankRendererStaticProps {
  blankId: string
  forceMode?: FillInTheBlanksMode
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/**
 * Renders either an input element (where user can type into)
 * or a drop area (where user can drop draggable answers),
 * depending on the mode
 */
export function BlankRendererStatic(props: BlankRendererStaticProps) {
  const { blankId, forceMode, onChange } = props

  const context = useContext(FillInTheBlanksContext)
  if (context === null) return null

  const mode = forceMode ?? context.mode
  const draggableSolution = [...context.locationOfDraggables.value].find(
    (entry) => entry[1] === blankId
  )
  const draggableId = draggableSolution?.[0] ?? null
  const draggable = context.draggables.find(
    (draggable) => draggable.draggableId === draggableId
  )
  const draggableText = draggable?.text ?? ''

  const feedback = context.feedbackForBlanks
  const isAnswerCorrect = feedback.get(blankId)?.isCorrect
  const text = context.textInBlanks.get(blankId)?.text ?? ''

  return mode === 'typing' ? (
    <input
      className={cn(
        'h-[25px] resize-none rounded-full border border-brand bg-brand-50 pl-2 pr-1',
        isAnswerCorrect && 'border-green-500',
        isAnswerCorrect === false && 'border-red-500'
      )}
      size={(text.length ?? 4) + 1}
      spellCheck={false}
      autoCorrect="off"
      placeholder=""
      type="text"
      value={text}
      onChange={(event) => {
        setTextUserTypedIntoBlank(context, blankId, event.target.value)
        onChange?.(event)
      }}
    />
  ) : (
    <DroppableBlank blankId={blankId} isDisabled={draggableId !== null}>
      {draggableId ? (
        <DraggableSolution text={draggableText} draggableId={draggableId} />
      ) : null}
    </DroppableBlank>
  )
}
