import { Dispatch, SetStateAction, useEffect } from 'react'

import { feedbackAnimation } from '../../../utils/feedback-animation'
import { useExerciseData } from '../../../utils/math-skills-data-context'

interface ExerciseFeedbackProps {
  noUserInput: boolean
  noUserInputText?: JSX.Element
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
  isIncorrectText?: JSX.Element
  isCorrect: boolean
  makeNewExercise: () => void
  elementToShakeQuery?: string
  centAmount?: number
}
export function ExerciseFeedback({
  noUserInput,
  noUserInputText,
  isChecked,
  setIsChecked,
  isIncorrectText,
  isCorrect,
  makeNewExercise,
  elementToShakeQuery,
  centAmount,
}: ExerciseFeedbackProps) {
  const { setExerciseData } = useExerciseData()

  function onCheck() {
    if (noUserInput) return
    feedbackAnimation(
      isCorrect,
      elementToShakeQuery
        ? document.querySelector<HTMLElement>(elementToShakeQuery)
        : null
    )
    setIsChecked(true)
    setExerciseData(isCorrect, centAmount)
  }

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, isCorrect, noUserInput])

  return (
    <div className="mt-5 min-h-[120px] sm:flex sm:min-h-[80px] sm:items-center sm:justify-between">
      <div className="text-almost-black">
        {isChecked ? (
          <p>
            {isCorrect
              ? 'Sehr gut gemacht 👌'
              : isIncorrectText ?? <>Leider nicht richtig.</>}
          </p>
        ) : null}
      </div>
      <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
        {noUserInput ? (
          noUserInputText ?? ''
        ) : (
          <button
            className="serlo-button-blue -mt-1 h-8 focus:bg-brand"
            onClick={isChecked ? makeNewExercise : onCheck}
          >
            {isChecked ? 'Nächste Aufgabe' : 'Überprüfen'}
          </button>
        )}
      </div>
    </div>
  )
}
