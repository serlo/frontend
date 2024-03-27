import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { SkipExerciseButton } from './skip-exercise-button'
import { feedbackAnimation } from '../utils/feedback-animation'
import {
  useExerciseData,
  useMathSkillsStorage,
} from '../utils/math-skills-data-context'

export type ExStatus = 'fresh' | 'correct' | 'incorrect' | 'revealed'

interface ExerciseFeedbackProps {
  noUserInput: boolean
  noUserInputText?: JSX.Element
  exStatus: ExStatus
  setExStatus: Dispatch<SetStateAction<ExStatus>>
  isCorrect: boolean
  feedbacks?: {
    correct?: JSX.Element | Text
    incorrect?: JSX.Element | Text
    revealed?: JSX.Element | Text
  }
  onNewExecise: () => void
  shakeElementQuery?: string // nod or shake for feedback
  focusElementQuery?: string // focus on new exercise
  centAmount?: number
  forceCheck?: boolean
}
export function ExerciseFeedback({
  noUserInput,
  noUserInputText,
  setExStatus,
  feedbacks,
  exStatus,
  isCorrect,
  onNewExecise,
  shakeElementQuery,
  focusElementQuery,
  centAmount,
  forceCheck,
}: ExerciseFeedbackProps) {
  const { setExerciseData } = useExerciseData()
  const [attempts, setAttempts] = useState(0)
  const data = useMathSkillsStorage().data
  const isRevealButton = exStatus === 'incorrect'
  const isNextButton = exStatus === 'correct' || exStatus === 'revealed'

  function newEx() {
    setExStatus('fresh')
    onNewExecise()

    if (focusElementQuery) {
      setTimeout(() => {
        const target = document.querySelector(focusElementQuery)
        ;(target as HTMLInputElement)?.focus()
      })
    }
  }

  function checkEx() {
    if (noUserInput) return
    feedbackAnimation(isCorrect, shakeElementQuery)
    setExStatus(isCorrect ? 'correct' : 'incorrect')
    setAttempts(attempts + 1)
    setExerciseData(isCorrect, centAmount)
  }

  function revealEx() {
    setExStatus('revealed')
  }

  const onButtonClick = isRevealButton
    ? undefined
    : isNextButton
      ? newEx
      : checkEx

  useEffect(() => {
    if (forceCheck) checkEx()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceCheck])

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onButtonClick?.()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onButtonClick])

  return (
    <>
      <div className="mt-5 flex min-h-[120px] flex-col items-center sm:min-h-[80px] sm:flex-row sm:justify-between">
        <div className="text-almost-black">
          <p>
            {exStatus === 'correct'
              ? `Sehr gut gemacht ${data.name ?? ''} 👍`
              : null}
            {exStatus === 'incorrect' ? (
              <>{feedbacks?.incorrect ?? 'Das stimmt so noch nicht.'}</>
            ) : null}
            {exStatus === 'revealed' ? <>{feedbacks?.revealed ?? ''}</> : null}
          </p>
        </div>
        <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
          {noUserInput ? noUserInputText ?? '' : renderMainButton()}
        </div>
      </div>
      <div className="flex justify-between">
        <SkipExerciseButton makeNewExercise={newEx} hidden={isNextButton} />
      </div>
    </>
  )

  function renderMainButton() {
    if (isRevealButton) return null
    return (
      <button className="serlo-button-blue -mt-1 h-8" onClick={onButtonClick}>
        {isNextButton && 'Nächste Aufgabe 👉'}
        {exStatus === 'fresh' && "Stimmt's?"}
      </button>
    )
  }
}
