import { Dispatch, SetStateAction, useState } from 'react'

import { ExerciseFeedback } from './feedback/execise-feedback'
import { NewExerciseButton } from './new-exercise-button'

export interface ExerciseWrapperProps<GeneratedData, InteractionState> {
  generator: () => GeneratedData
  check: (input: InteractionState, data: GeneratedData) => boolean
  getCorrect?: (input: GeneratedData) => InteractionState
  renderTaskAndInputs: ({
    data,
    interactionState,
    setInteractionState,
    isChecked,
    isCorrect,
  }: {
    data: GeneratedData
    interactionState: InteractionState | null
    setInteractionState: Dispatch<SetStateAction<InteractionState | null>>
    isChecked: boolean
    isCorrect: boolean
  }) => JSX.Element
  centAmount?: number
  noUserInputText: JSX.Element
  elementToShakeQuery?: string
  inputToFocusQuery?: string
  // className?: string
}

export function ExerciseWrapper<GeneratedData, InteractionState>({
  generator,
  check,
  renderTaskAndInputs,
  // getCorrect,
  inputToFocusQuery,
  elementToShakeQuery,
  centAmount = 35,
  noUserInputText,
}: ExerciseWrapperProps<GeneratedData, InteractionState>) {
  const [data, setData] = useState<GeneratedData>(generator())
  const [interactionState, setInteractionState] =
    useState<InteractionState | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const isCorrect = interactionState ? check(interactionState, data) : false

  function makeNewExercise() {
    setData(generator())
    setInteractionState(null)
    setIsChecked(false)
    setTimeout(() => {
      if (!inputToFocusQuery) return
      document.querySelector<HTMLElement>(inputToFocusQuery)?.focus()
    })
  }

  return (
    <>
      <NewExerciseButton makeNewExercise={makeNewExercise} />

      {renderTaskAndInputs({
        data,
        interactionState,
        setInteractionState,
        isChecked,
        isCorrect,
      })}

      <ExerciseFeedback
        noUserInput={interactionState === null}
        noUserInputText={noUserInputText}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isCorrect={isCorrect}
        elementToShakeQuery={elementToShakeQuery}
        makeNewExercise={makeNewExercise}
        centAmount={centAmount}
      />
    </>
  )
}
