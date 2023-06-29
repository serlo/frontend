import type A from 'algebra.js'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

import { Feedback } from '@/components/content/exercises/feedback'
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
  onEvaluate?: (correct: boolean) => void
}

interface FeedbackData {
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
  const [A, setA] = useState<typeof import('algebra.js') | null>(null)
  const exStrings = useInstanceData().strings.content.exercises

  useEffect(() => void import('algebra.js').then((value) => setA(value)), [])

  function evaluate() {
    const feedbackData = checkAnswer()
    if (onEvaluate) onEvaluate(feedbackData.correct)
    setFeedback(feedbackData)
  }

  return (
    <div className="mx-side mb-7">
      <input
        className={tw`
            serlo-input-font-reset mb-5
            rounded-3xl border-3 border-brand-400 py-2
            px-3 font-bold text-brand placeholder-brand focus:border-brand focus:bg-white
            focus:text-brand focus:placeholder-opacity-0 focus:opacity-100 focus:outline-none
            active:border-brand print:hidden
          `}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') evaluate()
        }}
        placeholder={exStrings.yourAnswer}
      />{' '}
      {unit}
      <br />
      {feedback && (
        <Feedback correct={feedback.correct}>{feedback.message}</Feedback>
      )}
      {A && (
        <a
          className={clsx(
            'serlo-button-blue mt-4 !text-white',
            value === '' && 'pointer-events-none opacity-0'
          )}
          onClick={evaluate}
        >
          {exStrings.check}
        </a>
      )}
    </div>
  )

  function checkAnswer(): FeedbackData {
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
      case 'input-number-exact-match-challenge':
        return normalizeNumber(_value).replace(/\s/g, '')
      case 'input-expression-equal-match-challenge':
        return A ? A.parse(normalizeNumber(_value)) : undefined
      case 'input-string-normalized-match-challenge':
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
