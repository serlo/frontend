// import { useDroppable } from '@dnd-kit/core'
import { ChangeEventHandler, useContext } from 'react'

import type { FillInTheBlanksMode } from '.'
import { BlankRendererInput } from './components/blank-renderer-input'
import { DraggableSolution } from './components/blank-solution'
import { DroppableBlank } from './components/droppable-blank'
import { FillInTheBlanksContext } from './context/blank-context'

interface BlankRendererProps {
  blankId: string
  forceMode?: FillInTheBlanksMode
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/** Renders either an input element (where user can type into) or a drop area (where user can drop draggable answers) depending on the mode  */
export function BlankRenderer(props: BlankRendererProps) {
  const { blankId, forceMode, onChange } = props

  const context = useContext(FillInTheBlanksContext)
  if (context === null) {
    // blankStates was not provided by FillInTheBlanksRenderer -> cannot continue
    return null
  }
  const mode = forceMode ?? context.mode

  const draggableSolutionInBlank = [...context.locationOfDraggables.value].find(
    (entry) => entry[1] === blankId
  )

  const draggableIdInThisBlank = draggableSolutionInBlank
    ? draggableSolutionInBlank[0]
    : null

  const draggableText = context.draggables.find(
    (draggable) => draggable.draggableId === draggableIdInThisBlank
  )?.text

  return mode === 'typing' ? (
    <BlankRendererInput
      blankId={blankId}
      context={context}
      onChange={onChange}
    />
  ) : (
    <DroppableBlank
      blankId={blankId}
      isDisabled={draggableIdInThisBlank !== null}
    >
      {draggableIdInThisBlank ? (
        <DraggableSolution
          text={draggableText ?? ''}
          draggableId={draggableIdInThisBlank}
        />
      ) : null}
    </DroppableBlank>
  )
}
