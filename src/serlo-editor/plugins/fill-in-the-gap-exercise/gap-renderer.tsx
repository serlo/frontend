import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { useContext } from 'react'

import { GapSolution } from './components/gap-solution'
import { GapStatesContext } from './context/gap-context'
import { GapDragAndDropSolutions } from './renderer'

export function GapRenderer(props: { correctAnswer: string; gapId: string }) {
  const dragAndDropSolutions = useContext(GapDragAndDropSolutions)
  const gapStates = useContext(GapStatesContext)
  if (gapStates === null) {
    // gapStates was not provided by FillInTheGapRenderer -> cannot continue
    return null
  }
  const gapAnswerCorrectList = gapStates.gapFeedback
  const mode = gapStates.mode

  const draggableElementInGap = dragAndDropSolutions?.find(
    (entry) => entry.inDroppableId === props.gapId
  )

  const isAnswerCorrect = gapAnswerCorrectList.get(props.gapId)?.isCorrect

  const textInInput =
    gapStates.textUserTypedIntoGap.value.get(props.gapId)?.text ?? ''

  return (
    <>
      {mode === 'fill-in-the-gap' ? (
        <input
          className={clsx(
            'h-full resize-none rounded-full border border-brand bg-brand-50 px-2',
            isAnswerCorrect && 'border-green-500',
            isAnswerCorrect === false && 'border-red-500'
          )}
          size={textInInput.length}
          spellCheck={false}
          autoCorrect="off"
          placeholder=""
          type="text"
          value={textInInput}
          onChange={(e) => setTextUserTypedIntoGap(e.target.value)}
        />
      ) : (
        <>
          {draggableElementInGap ? (
            <GapSolution
              text={draggableElementInGap.text}
              draggableId={draggableElementInGap.draggableId}
            />
          ) : (
            <EmptyGapWithDropZone id={props.gapId} />
          )}
        </>
      )}
    </>
  )

  function setTextUserTypedIntoGap(newText: string) {
    // Copy Map object
    const newTextUserTypedIntoGapList = new Map<string, { text: string }>(
      gapStates?.textUserTypedIntoGap.value
    )

    // Set new text
    newTextUserTypedIntoGapList.set(props.gapId, { text: newText })

    // Update state
    gapStates?.textUserTypedIntoGap.set(newTextUserTypedIntoGapList)
  }
}

function EmptyGapWithDropZone(props: { id: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.id,
  })

  return (
    <span
      className={clsx(
        'rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
        isOver && 'bg-slate-400'
      )}
      ref={setNodeRef}
    ></span>
  )
}
