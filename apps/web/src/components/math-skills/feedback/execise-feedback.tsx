import { Dispatch, SetStateAction, useEffect } from 'react'

import { SkipExerciseButton } from './skip-exercise-button'
import { feedbackAnimation } from '../utils/feedback-animation'
import { useExerciseData } from '../utils/math-skills-data-context'

interface ExerciseFeedbackProps {
  noUserInput: boolean
  noUserInputText?: JSX.Element
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
  isIncorrectText?: JSX.Element
  isCorrect: boolean
  onNewExecise: () => void
  shakeElementQuery?: string // nod or shake for feedback
  focusElementQuery?: string // focus on new exercise
  centAmount?: number
  forceCheck?: boolean
}
export function ExerciseFeedback({
  noUserInput,
  noUserInputText,
  isChecked,
  setIsChecked,
  isIncorrectText,
  isCorrect,
  onNewExecise,
  shakeElementQuery,
  focusElementQuery,
  centAmount,
  forceCheck,
}: ExerciseFeedbackProps) {
  const { setExerciseData } = useExerciseData()

  function makeNewExercise() {
    setIsChecked(false)
    onNewExecise()

    if (focusElementQuery) {
      setTimeout(() => {
        const target = document.querySelector(focusElementQuery)
        ;(target as HTMLInputElement)?.focus()
      })
    }
  }

  function onCheck() {
    if (noUserInput) return
    feedbackAnimation(isCorrect, shakeElementQuery)
    setIsChecked(true)
    setExerciseData(isCorrect, centAmount)
  }

  useEffect(() => {
    if (forceCheck) onCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceCheck])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') isChecked ? makeNewExercise() : onCheck()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, isCorrect, noUserInput])

  return (
    <>
      <div className="mt-5 flex min-h-[120px] flex-col items-center sm:min-h-[80px] sm:flex-row sm:justify-between">
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
              {isChecked ? 'Nächste Aufgabe 👉' : "Stimmt's?"}
            </button>
          )}
        </div>
      </div>
      <div className="text-right">
        <SkipExerciseButton
          makeNewExercise={makeNewExercise}
          hidden={isChecked}
        />
      </div>
    </>
  )
}
