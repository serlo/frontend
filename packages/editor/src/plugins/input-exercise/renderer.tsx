import { ExerciseFeedback } from '@editor/editor-ui/exercises/exercise-feedback'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useEffect, useState } from 'react'

import { getMatchingAnswer } from './helper/get-matching-answer'
import { InputExerciseType } from './input-exercise-type'

export type MathjsImport = typeof import('mathjs')

export interface InputExerciseAnswer {
  value: string
  isCorrect: boolean
  feedback: JSX.Element | null
}

interface InputExersiseRendererProps {
  type: InputExerciseType
  unit: string
  answers: InputExerciseAnswer[]
  onEvaluate?: (correct: boolean, val: string) => void
}

export interface FeedbackData {
  correct: boolean
  message: JSX.Element
}

export function InputExerciseRenderer({
  type,
  unit,
  answers,
  onEvaluate,
}: InputExersiseRendererProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [value, setValue] = useState('')
  const exStrings = useInstanceData().strings.content.exercises

  const [mathjs, setMathjs] = useState<MathjsImport | null>(null)
  useEffect(() => void import('mathjs').then((math) => setMathjs(math)), [])

  function handleEvaluate() {
    if (!mathjs) return

    const answer = getMatchingAnswer(answers, value, type, mathjs)
    const hasCorrectAnswer = !!answer?.isCorrect
    const customFeedbackNode = answer?.feedback ?? null

    if (onEvaluate) onEvaluate(hasCorrectAnswer, value)
    setFeedback({
      correct: hasCorrectAnswer,
      message: customFeedbackNode ?? (
        <>{exStrings[hasCorrectAnswer ? 'correct' : 'wrong']}</>
      ),
    })
  }

  return (
    <div className="mx-side mb-7">
      <input
        className={cn(`
            serlo-input-font-reset mb-5
            rounded-3xl border-3 border-brand-400 px-3
            py-2 font-bold text-brand placeholder-brand focus:border-brand focus:bg-white
            focus:text-brand focus:placeholder-opacity-0 focus:opacity-100 focus:outline-none
            active:border-brand print:hidden
          `)}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setFeedback(null)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEvaluate()
        }}
        placeholder={exStrings.yourAnswer}
      />{' '}
      {unit}
      <br />
      <div className="mt-4 flex">
        <button
          className={cn(
            'serlo-button-blue h-8',
            value === '' && 'pointer-events-none opacity-0'
          )}
          onClick={handleEvaluate}
        >
          {exStrings.check}
        </button>
        {feedback && value ? (
          <ExerciseFeedback correct={feedback.correct}>
            {feedback.message}
          </ExerciseFeedback>
        ) : null}
      </div>
    </div>
  )
}
