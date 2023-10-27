import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { useContext } from 'react'

import { GapSolution } from './components/gap-solution'
import { GapStatesContext } from './context/gap-context'
import { GapDragAndDropSolutions } from './renderer'

export function GapRenderer(props: { correctAnswer: string; gapId: string }) {
  const gapSolutionList = useContext(GapDragAndDropSolutions)
  const gapStates = useContext(GapStatesContext)
  if (gapStates === null) {
    return null
  }
  const gapAnswerCorrectList = gapStates.gapFeedback
  const mode = gapStates.mode

  const draggableElementInGap = GetDraggableElementInGap()
  function GetDraggableElementInGap() {
    if (!gapSolutionList) return null
    const entry = gapSolutionList.find(
      (entry) => entry.inDroppableId === props.gapId
    )
    if (!entry) return null
    return entry
  }

  const isAnswerCorrect = gapAnswerCorrectList.get(props.gapId)?.isCorrect

  const textInInput = gapStates.textUserTypedIntoGap.value.get(props.gapId)
    ? (gapStates.textUserTypedIntoGap.value.get(props.gapId)?.text as string)
    : ''

  // if (
  //   !gapContext.textUserTypedIntoGap.value.find(
  //     (entry) => entry.gapId === props.gapId
  //   )
  // ) {
  //   setTextUserTypedIntoGap('', props.gapId, gapContext.textUserTypedIntoGap)
  // }

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
    const newTextUserTypedIntoGapList = new Map<string, { text: string }>(
      gapStates?.textUserTypedIntoGap.value
    )

    newTextUserTypedIntoGapList.set(props.gapId, { text: newText })

    // Set state
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
