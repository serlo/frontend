// import { useDroppable } from '@dnd-kit/core'
import { cn } from '@serlo/frontend/src/helper/cn'
import { ChangeEventHandler, ReactNode, useContext } from 'react'
import { useDrop } from 'react-dnd'

import type { BlankId, DraggableId, FillInTheBlanksMode } from '.'
import { DraggableSolution } from './components/blank-solution'
import { FillInTheBlanksContext } from './context/blank-context'

/** Renders either an input element (where user can type into) or a drop area (where user can drop draggable answers) depending on the mode  */
export function BlankRenderer(props: {
  blankId: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  forceMode?: FillInTheBlanksMode
}) {
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

  const draggableSolutionInBlank = [
    ...fillInTheBlanksContext.locationOfDraggables.value,
  ].find((entry) => entry[1] === props.blankId)

  const draggableIdInThisBlank = draggableSolutionInBlank
    ? draggableSolutionInBlank[0]
    : null

  const draggableText = fillInTheBlanksContext.draggables.find(
    (draggable) => draggable.draggableId === draggableIdInThisBlank
  )?.text

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
        <DroppableBlank
          blankId={props.blankId}
          disable={draggableIdInThisBlank !== null}
          isAnswerCorrect={isAnswerCorrect}
        >
          {draggableIdInThisBlank ? (
            <DraggableSolution
              text={draggableText ?? ''}
              draggableId={draggableIdInThisBlank}
            />
          ) : null}
        </DroppableBlank>
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

function DroppableBlank(props: {
  blankId: BlankId
  disable: boolean
  isAnswerCorrect: boolean | undefined
  children: ReactNode
}) {
  const fillInTheBlanksContext = useContext(FillInTheBlanksContext)
  const [{ isOver }, dropRef] = useDrop({
    accept: 'blank-solution',
    drop: (item) => {
      if (!fillInTheBlanksContext) return
      const newMap = new Map<DraggableId, BlankId>(
        fillInTheBlanksContext.locationOfDraggables.value
      )
      newMap.set(
        (item as { draggableId: DraggableId }).draggableId,
        props.blankId
      )
      fillInTheBlanksContext.locationOfDraggables.set(newMap)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => !props.disable,
  })

  return (
    <span
      className={cn(
        'rounded-full border border-brand bg-brand-50 px-2',
        isOver && !props.disable && 'bg-slate-400',
        props.isAnswerCorrect && 'border-green-500',
        props.isAnswerCorrect === false && 'border-red-500'
      )}
      ref={dropRef}
    >
      {props.children}
    </span>
  )
}
