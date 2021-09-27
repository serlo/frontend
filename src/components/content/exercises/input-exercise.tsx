import type A from 'algebra.js'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

import { Feedback } from './feedback'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginInputExercise } from '@/data-types'
import { submitEventWithPath } from '@/helper/submit-event'
import { NodePath, RenderNestedFunction } from '@/schema/article-renderer'

export interface InputExerciseProps {
  data: EdtrPluginInputExercise['state']
  path?: NodePath
  renderNested: RenderNestedFunction
  isRevisionView?: boolean
}

interface FeedbackData {
  correct: boolean
  message: JSX.Element
}

export function InputExercise({
  data,
  path,
  renderNested,
  isRevisionView,
}: InputExerciseProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [value, setValue] = useState('')
  const [A, setA] = useState<typeof import('algebra.js') | null>(null)
  const { strings } = useInstanceData()

  useEffect(() => {
    void import('algebra.js').then((value) => setA(value))
  }, [])

  function evaluate() {
    const feedbackData = checkAnswer()
    setFeedback(feedbackData)
    submitEventWithPath('checkinput', path)
    if (feedbackData.correct) {
      submitEventWithPath('inputcorrect', path)
    }
  }

  return (
    <div className="mx-side mb-7">
      <input
        className={clsx(
          'print:hidden serlo-input-font-reset',
          'rounded-3xl py-2 px-3 active:font-bold focus:font-bold ',
          'border-3 border-brand bg-brand mb-5 text-white',
          'focus:outline-none focus:bg-white focus:text-brand focus:opacity-100 focus:placeholder-opacity-0',
          'placeholder-white'
        )}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') evaluate()
        }}
        placeholder={strings.content.yourAnswer}
      />{' '}
      {data.unit}
      <br />
      {feedback && (
        <Feedback correct={feedback.correct}>{feedback.message}</Feedback>
      )}
      {A && (
        <>
          <a
            className={clsx(
              'serlo-button serlo-make-interactive-primary',
              'mt-4',
              value === '' && 'opacity-0 pointer-events-none'
            )}
            onClick={evaluate}
          >
            {strings.content.check}
          </a>
          {isRevisionView && renderRevisionExtra()}
        </>
      )}
    </div>
  )

  function checkAnswer(): FeedbackData {
    const answers = data.answers
    const filteredAnswers = answers.filter((answer) => {
      try {
        const solution = normalize(answer.value)
        const submission = normalize(value)

        if (
          data.type === 'input-expression-equal-match-challenge' &&
          solution
        ) {
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
    const hasCustomFeedback = filteredAnswers[0]?.feedback.length > 0
    const customFeedbackNode =
      hasCustomFeedback &&
      (renderNested(filteredAnswers[0]?.feedback, 'feedback') as JSX.Element)

    if (filteredAnswers.length < 1 || !filteredAnswers[0]?.isCorrect) {
      return {
        correct: false,
        message: customFeedbackNode || <>{strings.content.wrong}</>,
      }
    } else {
      return {
        correct: true,
        message: customFeedbackNode || <>{strings.content.right}</>,
      }
    }
  }

  function normalize(value: string) {
    const _value = collapseWhitespace(value)
    switch (data.type) {
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

  function renderRevisionExtra() {
    return data.answers.map((answer) => (
      <div
        key={answer.value}
        className="bg-yellow-200 rounded-xl py-2 mb-4 serlo-revision-extra-info"
      >
        <span className="font-bold text-sm mx-side">
          {strings.content.answer}{' '}
          {answer.isCorrect && `[${strings.content.right}]`}:
        </span>
        {answer.value}
        {renderNested(answer.feedback, `mcfeedbackrevision`)}
      </div>
    ))
  }
}
