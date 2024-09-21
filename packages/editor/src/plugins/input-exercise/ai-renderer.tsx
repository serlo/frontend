import { AIExerciseFeedback } from '@editor/editor-ui/exercises/ai-exercise-feedback'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useEffect, useState } from 'react'

import { getMatchingAnswer } from './helper/get-matching-answer'
import { InputExerciseType } from './input-exercise-type'
import { useInputFeedbackAiExerciseState } from './use-input-feedback-ai-exercise-state'
import { ChatCompletionMessageParam } from '@/components/exercise-generation/exercise-generation-wizard/execute-ai-prompt'

export type MathjsImport = typeof import('mathjs')

export interface InputExerciseAnswer {
  value: string
  isCorrect: boolean
  feedback: JSX.Element | null
}

interface InputExerciseRendererProps {
  unit: string
  answers: InputExerciseAnswer[]
  onEvaluate?: (correct: boolean, val: string) => void
}

export interface FeedbackData {
  correct: boolean
  message: JSX.Element
}

export function AiInputExerciseRenderer({
  unit,
  answers,
  onEvaluate,
}: InputExerciseRendererProps) {
  const correctAnswers = answers.filter((answer) => answer.isCorrect)
  console.log('Correct Answers :', correctAnswers)
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [value, setValue] = useState('')
  const { aiMessages, setAiMessages, lastAiFeedbackRef } =
    useInputFeedbackAiExerciseState(correctAnswers)
  const [additionalPrompt, setAdditionalPrompt] = useState<string>('')
  const exStrings = useInstanceData().strings.content.exercises

  const [mathjs, setMathjs] = useState<MathjsImport | null>(null)
  useEffect(() => void import('mathjs').then((math) => setMathjs(math)), [])

  // Preload birdie here, so that it shows up immediately when the feedback is
  // rendered.
  useEffect(() => {
    const img = new Image()
    img.src = '/_assets/img/birdie.svg'
  }, [])

  function handleEvaluate() {
    if (!mathjs) return

    const answer = getMatchingAnswer(
      answers,
      value,
      InputExerciseType.AiFeedback,
      mathjs.evaluate
    )
    const hasCorrectAnswer = !!answer?.isCorrect
    const customFeedbackNode = answer?.feedback ?? null

    if (onEvaluate) onEvaluate(hasCorrectAnswer, value)

    setAiMessages((currentAiMessages) => {
      const newMessages = [
        ...currentAiMessages,
        ...(lastAiFeedbackRef.current
          ? ([
              {
                role: 'user',
                content: `Du (die KI) hast folgendes geantwortet. Stell sicher, dass du bei den künftigen Antworten den Studenten besser zu der Lösung leitest und auf keinen Fall mehrmals die gleiche Antwort gibst. '${lastAiFeedbackRef.current}'`,
              },
            ] as ChatCompletionMessageParam[])
          : []),
        {
          role: 'user',
          content: `Der Schüler hat folgendes geantwortet: ${value}`,
        },
      ]

      return newMessages
    })

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
        data-qa="plugin-input-exercise-input"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEvaluate()
        }}
        placeholder={exStrings.yourAnswer}
      />{' '}
      {unit}
      <br />
      <div className={cn('mt-4 flex')}>
        <button
          className={cn(
            'serlo-button-blue h-8',
            value === '' && 'pointer-events-none opacity-0'
          )}
          onClick={handleEvaluate}
        >
          {exStrings.check}
        </button>

        {feedback && (
          <AIExerciseFeedback
            value={value}
            feedback={feedback}
            aiMessages={aiMessages}
            setAiMessages={setAiMessages}
            lastAiFeedbackRef={lastAiFeedbackRef}
          />
        )}
      </div>
    </div>
  )
}
