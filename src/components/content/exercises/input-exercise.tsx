import type A from 'algebra.js'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Feedback } from './feedback'
import { useInstanceData } from '@/contexts/instance-context'
import { EdtrPluginInputExercise } from '@/frontend-node-types'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { tw } from '@/helper/tw'
import { RenderNestedFunction } from '@/schema/article-renderer'

export interface InputExerciseProps {
  data: EdtrPluginInputExercise['state']
  renderNested: RenderNestedFunction
  isRevisionView?: boolean
  context: {
    entityId: number
    revisionId: number
  }
}

interface FeedbackData {
  correct: boolean
  message: JSX.Element
}

export function InputExercise({
  data,
  renderNested,
  isRevisionView,
  context,
}: InputExerciseProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [value, setValue] = useState('')
  const [A, setA] = useState<typeof import('algebra.js') | null>(null)
  const exStrings = useInstanceData().strings.content.exercises

  const { asPath } = useRouter()

  useEffect(() => {
    void import('algebra.js').then((value) => setA(value))
  }, [])

  function evaluate() {
    const feedbackData = checkAnswer()
    exerciseSubmission({
      path: asPath,
      entityId: context.entityId,
      revisionId: context.revisionId,
      result: feedbackData.correct ? 'correct' : 'wrong',
      type: 'input',
    })
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
      {data.unit}
      <br />
      {feedback && (
        <Feedback correct={feedback.correct}>{feedback.message}</Feedback>
      )}
      {A && (
        <>
          <a
            className={clsx(
              'serlo-button-blue mt-4',
              value === '' && 'pointer-events-none opacity-0'
            )}
            onClick={evaluate}
          >
            {exStrings.check}
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
        message: customFeedbackNode || <>{exStrings.wrong}</>,
      }
    } else {
      return {
        correct: true,
        message: customFeedbackNode || <>{exStrings.correct}</>,
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
        className="serlo-revision-extra-info mb-4 rounded-xl bg-editor-primary-100 py-2"
      >
        <span className="mx-side text-sm font-bold">
          {exStrings.answer} {answer.isCorrect && `[${exStrings.correct}]`}:
        </span>
        {answer.value}
        {renderNested(answer.feedback, `mcfeedbackrevision`)}
      </div>
    ))
  }
}
