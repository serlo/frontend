import { ChangeEventHandler, useContext } from 'react'

import type { FillInTheBlanksMode } from '.'
import { BlankRendererInputStatic } from './components/blank-renderer-input-static'
import { DraggableSolution } from './components/blank-solution'
import { DroppableBlank } from './components/droppable-blank'
import { FillInTheBlanksContext } from './context/blank-context'

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

  return mode === 'typing' ? (
    <BlankRendererInputStatic
      blankId={blankId}
      context={context}
      onChange={onChange}
    />
  ) : (
    <DroppableBlank blankId={blankId} isDisabled={draggableId !== null}>
      {draggableId ? (
        <DraggableSolution text={draggableText} draggableId={draggableId} />
      ) : null}
    </DroppableBlank>
  )
}
