// import { useDroppable } from '@dnd-kit/core'
import { ChangeEventHandler, useContext } from 'react'
import { Editor } from 'slate'

import type { FillInTheBlanksMode } from '.'
import { BlankRendererInput } from './components/blank-renderer-input'
import { DraggableSolution } from './components/blank-solution'
import { DroppableBlank } from './components/droppable-blank'
import { FillInTheBlanksContext } from './context/blank-context'

interface BlankRendererProps {
  blankId: string
  editor?: Editor
  forceMode?: FillInTheBlanksMode
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/** Renders either an input element (where user can type into) or a drop area (where user can drop draggable answers) depending on the mode  */
export function BlankRenderer(props: BlankRendererProps) {
  const { blankId, forceMode, editor, onChange } = props

  const fillInTheBlanksContext = useContext(FillInTheBlanksContext)
  if (fillInTheBlanksContext === null) {
    // blankStates was not provided by FillInTheBlanksRenderer -> cannot continue
    return null
  }
  const mode = forceMode ?? fillInTheBlanksContext.mode

  const draggableSolutionInBlank = [
    ...fillInTheBlanksContext.locationOfDraggables.value,
  ].find((entry) => entry[1] === blankId)

  const draggableIdInThisBlank = draggableSolutionInBlank
    ? draggableSolutionInBlank[0]
    : null

  const draggableText = fillInTheBlanksContext.draggables.find(
    (draggable) => draggable.draggableId === draggableIdInThisBlank
  )?.text

  return mode === 'typing' ? (
    <BlankRendererInput
      blankId={blankId}
      context={fillInTheBlanksContext}
      editor={editor}
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
