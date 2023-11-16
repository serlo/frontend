import type A from 'algebra.js'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

import { InputExerciseType } from './input-exercise-type'
import { Feedback } from '../sc-mc-exercise/renderer/feedback'
import { useExerciseFolderStats } from '@/contexts/exercise-folder-stats-context'
import { useInstanceData } from '@/contexts/instance-context'
import { tw } from '@/helper/tw'

interface InputExersiseRendererProps {
  type: string
  unit: string
  answers: {
    value: string
    isCorrect: boolean
    feedback: JSX.Element | null
  }[]
  onEvaluate?: (correct: boolean, val: string) => void
  id?: number
}

interface FeedbackData {
  correct: boolean
  message: JSX.Element
}

type AlgebraJSImport = typeof import('algebra.js')

export function InputExerciseRenderer({
  type,
  unit,
  answers,
  onEvaluate,
  id,
}: InputExersiseRendererProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [value, setValue] = useState('')
  const [AlgebraJs, setAlgebraJs] = useState<AlgebraJSImport | null>(null)
  const exStrings = useInstanceData().strings.content.exercises

  const exerciseData = useExerciseFolderStats()

  const entry = exerciseData ? exerciseData.data[id ?? ''] : null

  useEffect(() => void import('algebra.js').then((A) => setAlgebraJs(A)), [])

  function evaluate() {
    const feedbackData = checkAnswer(value)
    if (onEvaluate) onEvaluate(feedbackData.correct, value)
    setFeedback(feedbackData)
  }

  return (
    <div className="mx-side mb-7">
      <input
        className={tw`
            serlo-input-font-reset mb-5
            rounded-3xl border-3 border-brand-400 px-3
            py-2 font-bold text-brand placeholder-brand focus:border-brand focus:bg-white
            focus:text-brand focus:placeholder-opacity-0 focus:opacity-100 focus:outline-none
            active:border-brand print:hidden
          `}
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setFeedback(null)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') evaluate()
        }}
        placeholder={exStrings.yourAnswer}
      />{' '}
      {unit}
      <br />
      <div className="mt-4 flex">
        {AlgebraJs ? (
          <button
            className={clsx(
              'serlo-button-blue h-8',
              value === '' && 'pointer-events-none opacity-0'
            )}
            onClick={evaluate}
          >
            {exStrings.check}
          </button>
        ) : null}
        {feedback && value ? (
          <Feedback correct={feedback.correct}>{feedback.message}</Feedback>
        ) : null}
      </div>
      {entry && entry.ivals.length > 0 && (
        <div className="-mt-4 mb-3">
          {prettyPrintSolutionEntries(entry.ivals.map((x) => x.trim()))}
        </div>
      )}
    </div>
  )

  function prettyPrintSolutionEntries(values: string[]) {
    const counted = values.reduce(
      (res, val) => {
        const entry = (res[val] = res[val] ?? { count: 0 })
        entry.count++
        return res
      },
      {} as { [key: string]: { count: number } }
    )
    const entries = Object.entries(counted)
    entries.sort((a, b) => b[1].count - a[1].count)
    return (
      <>
        {entries.map(([val, { count }]) => (
          <span
            key={val}
            className={clsx(
              'mr-4 inline-block',
              checkAnswer(val).correct && 'bg-green-200'
            )}
          >
            {val} <span className="text-gray-600">(x {count})</span>,
          </span>
        ))}
      </>
    )
  }

  function checkAnswer(value: string): FeedbackData {
    const filteredAnswers = answers.filter((answer) => {
      try {
        const solution = normalize(answer.value)
        const submission = normalize(value)

        if (type === 'input-expression-equal-match-challenge' && solution) {
          return (
            (solution as A.Expression)
              .subtract(submission as A.Expression)
              .toString() === '0'
          )
        }
        return solution === submission
      } catch (e) {
        return false
      }
    })
    const customFeedbackNode = filteredAnswers[0]?.feedback ?? null

    const hasCorrectAnswer =
      filteredAnswers.length > 0 && filteredAnswers[0].isCorrect

    return {
      correct: hasCorrectAnswer,
      message: customFeedbackNode ?? (
        <>{exStrings[hasCorrectAnswer ? 'correct' : 'wrong']}</>
      ),
    }
  }

  function normalize(value: string) {
    const _value = collapseWhitespace(value)
    switch (type) {
      case InputExerciseType.NumberExact:
        return normalizeNumber(_value).replace(/\s/g, '')
      case InputExerciseType.ExpressionEqual:
        return AlgebraJs ? AlgebraJs.parse(normalizeNumber(_value)) : undefined
      case InputExerciseType.StringNormalized:
        return _value.toUpperCase()
    }
  }

  function collapseWhitespace(val: string): string {
    return val.replace(/[\s\xa0]+/g, ' ').trim()
  }

  function normalizeNumber(val: string) {
    return val.replace(/,/g, '.').replace(/^[+]/, '')
  }
}
