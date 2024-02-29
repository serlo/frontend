import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'

import { NewExerciseButton } from '../number-line-exercise/new-exercise-button'
import { feedbackAnimation } from '../utils/feedback-animation'
import { useExerciseData } from '../utils/math-skills-data-context'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

const reorder = (list: number[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

interface OrderValuesProps {
  generator: () => { values: number[] }
  centAmount?: number
}

export function OrderValues({ generator, centAmount }: OrderValuesProps) {
  const [data, setData] = useState(generator())
  const [isChecked, setIsChecked] = useState(false)
  const { setExerciseData } = useExerciseData()
  const { values } = data
  const correctOrder = Array.from(values).sort((a, b) => b - a)
  const isCorrect = values.every((value, i) => value === correctOrder[i])

  function makeNewExercise() {
    setData(generator())
    setIsChecked(false)
    setTimeout(() => {
      document.getElementById('place-value-chooser-input')?.focus()
    })
  }

  function onCheck() {
    feedbackAnimation(
      isCorrect,
      document.getElementById('order-values-wrapper')
    )
    setIsChecked(true)
    setExerciseData(isCorrect, centAmount)
  }

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
      const isDown = e.key === 'ArrowDown'
      if (isDown || e.key === 'ArrowUp') {
        if (!document.activeElement) return true
        e.preventDefault()
        const target = document.activeElement?.[
          isDown ? 'nextElementSibling' : 'previousElementSibling'
        ] as HTMLDivElement
        const isDragging = target?.parentElement?.classList.contains('dragging')
        if (!isDragging) target?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, values])

  return (
    <>
      <NewExerciseButton makeNewExercise={makeNewExercise} />

      <div id="order-values-wrapper" className="flex">
        <h2 className="pb-8 text-left text-2xl font-bold text-almost-black">
          Sortiere:
        </h2>
        <div className="ml-8 text-right font-mono text-xl">
          {renderDragAndDropList()}
        </div>
        <div className="ml-2 flex flex-col justify-between py-2 text-lg text-gray-400">
          <span>
            👆 <small>Größere Zahlen</small>
          </span>
          <span>
            👇 <small>Kleinere Zahlen</small>
          </span>
        </div>
      </div>

      <div className="mt-5 min-h-[120px] sm:flex sm:min-h-[80px] sm:items-center sm:justify-between">
        <div className="text-almost-black">
          {isChecked ? (
            <p>
              {isCorrect ? 'Sehr gut gemacht 👌' : <>Leider nicht richtig.</>}
            </p>
          ) : null}
        </div>
        <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
          <button
            className="serlo-button-blue -mt-1 h-8 focus:bg-brand"
            onClick={isChecked ? makeNewExercise : onCheck}
          >
            {isChecked ? 'Nächste Aufgabe' : 'Überprüfen'}
          </button>
        </div>
      </div>
    </>
  )

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) return

    const newOrder = reorder(
      values,
      result.source.index,
      result.destination.index
    )

    setData({ values: newOrder })
  }

  function renderDragAndDropList() {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? 'dragging' : ''}
            >
              {values.map((value, index) => (
                <Draggable
                  key={value}
                  draggableId={value.toString()}
                  index={index}
                  isDragDisabled={isChecked}
                >
                  {(provided, { isDragging }) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        'mb-1 rounded-md border border-brand-100 p-2 font-bold text-almost-black',
                        'select-none bg-newgreen bg-opacity-0 hover:bg-opacity-5',
                        isDragging && ' bg-opacity-10',
                        isChecked && 'bg-opacity-10',
                        isChecked &&
                          !isCorrect &&
                          value !== correctOrder[index] &&
                          'bg-red-400'
                      )}
                      style={{ ...provided.draggableProps.style }}
                    >
                      {value}{' '}
                      <FaIcon
                        icon={faGripVertical}
                        className="mb-0.25 text-base text-newgreen opacity-70"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
