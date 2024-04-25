import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { ExStatus } from './execise-feedback'
import { SkillPoints } from '../math-skills-wrapper/skill-points'
import { useExerciseData } from '../utils/math-skills-data-context'
import { useSubmitEvent } from '../utils/math-skills-submit-event'
import { FaIcon } from '@/components/fa-icon'

interface ExerciseSelfFeedbackProps {
  exStatus: ExStatus
  setExStatus: Dispatch<SetStateAction<ExStatus>>
  feedbacks?: {
    correct?: JSX.Element | Text
    incorrect?: JSX.Element | Text
    revealed?: JSX.Element | Text
  }
  onNewExecise: () => void
  centAmount?: number
}
export function ExerciseSelfFeedback({
  setExStatus,
  feedbacks,
  centAmount,
  exStatus,
  onNewExecise,
}: ExerciseSelfFeedbackProps) {
  const submitEvent = useSubmitEvent()
  const { setExerciseData } = useExerciseData()
  const isNextButton = exStatus === 'correct' || exStatus === 'incorrect'

  function newEx() {
    setExStatus('fresh')
    onNewExecise()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function selfEvaluate(isCorrect: boolean) {
    if (isCorrect) {
      submitEvent('selfeval_correct')
    } else {
      submitEvent('selfeval_incorrect')
    }
    setExerciseData(isCorrect, centAmount)
    setExStatus(isCorrect ? 'correct' : 'incorrect')
  }

  useEffect(() => {
    if (!isNextButton) return
    const keyEventHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') newEx?.()
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exStatus])

  return (
    <div className="mt-10 border-t border-t-gray-200 py-7">
      <div className="flex justify-between">
        <b className="text-lg">Und wie lief&apos;s?</b>
        <div className="-mt-4">
          <SkillPoints />
        </div>
      </div>

      {isNextButton ? (
        <div className="-mt-2 flex min-h-[120px] flex-col items-center sm:min-h-[80px] sm:flex-row sm:justify-between">
          <div className="text-almost-black">
            <p>
              {exStatus === 'correct'
                ? 'Super, dann direkt weiter so! 👍'
                : null}
              {exStatus === 'incorrect' ? (
                <>
                  {feedbacks?.incorrect ?? 'Schade! Gleich noch mal probieren?'}
                </>
              ) : null}
            </p>
          </div>
          <div className="pt-5 sm:flex sm:justify-between sm:pt-0">
            {renderMainButton()}
          </div>
        </div>
      ) : (
        <div className="mt-3 flex justify-between">
          <button
            className="serlo-button-blue-transparent text-lg"
            onClick={() => selfEvaluate(false)}
          >
            <FaIcon icon={faCircleXmark} /> Nicht (ganz) richtig gelöst
          </button>
          <button
            className="serlo-button-green-transparent text-lg"
            onClick={() => selfEvaluate(true)}
          >
            <FaIcon icon={faCircleCheck} /> Erfolgreich gelöst!
          </button>
        </div>
      )}
    </div>
  )

  function renderMainButton() {
    if (!isNextButton) return null
    return (
      <button className="serlo-button-blue -mt-1 h-8" onClick={newEx}>
        Nächste Aufgabe 👉
      </button>
    )
  }
}
