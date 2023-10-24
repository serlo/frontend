import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { useContext } from 'react'

import { GapSolution, GapSolutionList } from './renderer'

export function GapRenderer(props: {
  mode: string
  correctAnswer: string
  id: string
}) {
  const gapSolutionList = useContext(GapSolutionList)

  const draggableElementInGap = GetDraggableElementInGap()
  function GetDraggableElementInGap() {
    if (!gapSolutionList) return null
    const entry = gapSolutionList.find(
      (entry) => entry.inDroppableId === props.id
    )
    if (!entry) return null
    return entry
  }

  const { mode } = props
  return (
    <>
      {mode === 'fill-in-the-gap' ? (
        <input
          className="h-full resize-none rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2"
          size={10}
          spellCheck={false}
          autoCorrect="off"
          placeholder=""
          type="text"
        />
      ) : (
        <>
          {draggableElementInGap ? (
            <GapSolution
              text={draggableElementInGap.text}
              draggableId={draggableElementInGap.draggableId}
            />
          ) : (
            <EmptyGapWithDropZone id={props.id} />
          )}
        </>
      )}
    </>
  )
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
