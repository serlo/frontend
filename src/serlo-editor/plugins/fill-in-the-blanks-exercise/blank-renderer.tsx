// import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { useContext } from 'react'

// import { BlankSolution } from './components/blank-solution'
// import { BlankDragAndDropSolutions } from './renderer'
import { BlankStatesContext } from './context/blank-context'

export function BlankRenderer(props: {
  correctAnswer: string
  blankId: string
}) {
  // const dragAndDropSolutions = useContext(BlankDragAndDropSolutions)
  // const draggableElementInBlank = dragAndDropSolutions?.find(
  //   (entry) => entry.inDroppableId === props.blankId
  // )

  const blankStates = useContext(BlankStatesContext)
  if (blankStates === null) {
    // blankStates was not provided by FillInTheBlanksRenderer -> cannot continue
    return null
  }
  const blankAnswerCorrectList = blankStates.blanksFeedback
  const mode = blankStates.mode

  const isAnswerCorrect = blankAnswerCorrectList.get(props.blankId)?.isCorrect

  const textInInput =
    blankStates.textUserTypedIntoBlank.value.get(props.blankId)?.text ?? ''

  return (
    <>
      {mode === 'fill-in-the-blanks' ? (
        <input
          className={clsx(
            'h-[25px] resize-none rounded-full border border-brand bg-brand-50 pl-2 pr-1',
            isAnswerCorrect && 'border-green-500',
            isAnswerCorrect === false && 'border-red-500'
          )}
          size={(textInInput.length ?? 4) + 1}
          spellCheck={false}
          autoCorrect="off"
          placeholder=""
          type="text"
          value={textInInput}
          onChange={(e) => setTextUserTypedIntoBlank(e.target.value)}
        />
      ) : (
        <>
          {/* {draggableElementInBlank ? (
            <BlankSolution
              text={draggableElementInBlank.text}
              draggableId={draggableElementInBlank.draggableId}
            />
          ) : (
            <EmptyBlankWithDropZone id={props.blankId} />
          )} */}
        </>
      )}
    </>
  )

  function setTextUserTypedIntoBlank(newText: string) {
    // Copy Map object
    const newTextUserTypedIntoBlankList = new Map<string, { text: string }>(
      blankStates?.textUserTypedIntoBlank.value
    )

    // Set new text
    newTextUserTypedIntoBlankList.set(props.blankId, { text: newText })

    // Update state
    blankStates?.textUserTypedIntoBlank.set(newTextUserTypedIntoBlankList)
  }
}

// function EmptyBlankWithDropZone(props: { id: string }) {
//   const { setNodeRef, isOver } = useDroppable({
//     id: props.id,
//   })

//   return (
//     <span
//       className={clsx(
//         'rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
//         isOver && 'bg-slate-400'
//       )}
//       ref={setNodeRef}
//     ></span>
//   )
// }
