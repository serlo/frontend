// import { useDroppable } from '@dnd-kit/core'
import { ChangeEventHandler, useContext } from 'react'

// import { BlankSolution } from './components/blank-solution'
// import { BlankDragAndDropSolutions } from './renderer'
import type { FillInTheBlanksMode } from '.'
import { FillInTheBlanksContext } from './context/blank-context'
import { cn } from '@serlo/frontend/src/helper/cn'

/** Renders either an input element (where user can type into) or a drop area (where user can drop draggable answers) depending on the mode  */
export function BlankRenderer(props: {
  correctAnswer: string
  blankId: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  forceMode?: FillInTheBlanksMode
}) {
  // const dragAndDropSolutions = useContext(BlankDragAndDropSolutions)
  // const draggableElementInBlank = dragAndDropSolutions?.find(
  //   (entry) => entry.inDroppableId === props.blankId
  // )

  const fillInTheBlanksContext = useContext(FillInTheBlanksContext)
  if (fillInTheBlanksContext === null) {
    // blankStates was not provided by FillInTheBlanksRenderer -> cannot continue
    return null
  }
  const feedbackForBlanks = fillInTheBlanksContext.feedbackForBlanks
  const mode = props.forceMode ?? fillInTheBlanksContext.mode

  const isAnswerCorrect = feedbackForBlanks.get(props.blankId)?.isCorrect

  const textInBlank =
    fillInTheBlanksContext.textInBlanks.get(props.blankId)?.text ?? ''

  return (
    <>
      {mode === 'typing' ? (
        <input
          className={cn(
            'h-[25px] resize-none rounded-full border border-brand bg-brand-50 pl-2 pr-1',
            isAnswerCorrect && 'border-green-500',
            isAnswerCorrect === false && 'border-red-500'
          )}
          size={(textInBlank.length ?? 4) + 1}
          spellCheck={false}
          autoCorrect="off"
          placeholder=""
          type="text"
          value={textInBlank}
          onChange={(e) => {
            setTextUserTypedIntoBlank(e.target.value)
            if (props.onChange) {
              props.onChange(e)
            }
          }}
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
      fillInTheBlanksContext?.textUserTypedIntoBlanks.value
    )

    // Set new text
    newTextUserTypedIntoBlankList.set(props.blankId, { text: newText })

    // Update state
    fillInTheBlanksContext?.textUserTypedIntoBlanks.set(
      newTextUserTypedIntoBlankList
    )
  }
}

// function EmptyBlankWithDropZone(props: { id: string }) {
//   const { setNodeRef, isOver } = useDroppable({
//     id: props.id,
//   })

//   return (
//     <span
//       className={cn(
//         'rounded-full border border-editor-primary-300 bg-editor-primary-100 px-2',
//         isOver && 'bg-slate-400'
//       )}
//       ref={setNodeRef}
//     ></span>
//   )
// }
