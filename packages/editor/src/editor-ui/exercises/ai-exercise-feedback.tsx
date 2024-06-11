import { FeedbackData } from '@editor/plugins/input-exercise/renderer'
import { useInputFeedbackAiExerciseState } from '@editor/plugins/input-exercise/use-ai-exercise-context'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { ExerciseFeedback } from './exercise-feedback'
import {
  useExecuteAIPrompt,
  ExecutePromptStatus,
  ChatCompletionMessageParam,
} from '../../../../../apps/web/src/components/exercise-generation/exercise-generation-wizard/execute-ai-prompt'

interface AIExerciseFeedbackProps
  extends ReturnType<typeof useInputFeedbackAiExerciseState> {
  value: string
  feedback: FeedbackData | null
}

export function AIExerciseFeedback({
  value,
  feedback,
  aiMessages,
  setAiMessages,
}: AIExerciseFeedbackProps) {
  const exStrings = useInstanceData().strings.content.exercises

  const [aiFeedback, setAiFeedback] = useState<string | null>(null)

  const {
    data: aiData,
    status: aiExecuteStatus,
    errorMessage,
  } = useExecuteAIPrompt<{ feedback: string }>({
    messages: aiMessages as ChatCompletionMessageParam[],
    submitEventPrefix: 'input-exercise-feedback',
    skipAuth: true,
  })

  // Only when the value of the user changes, we want to recompute the AI
  // messages and add the previous feedback. This is why we store the AI feedback in the ref
  const lastFeedbackRef = useRef<string | null>(null)
  useEffect(() => {
    setAiMessages((currentAiMessages) => [
      ...currentAiMessages,
      ...(lastFeedbackRef.current
        ? ([
            {
              role: 'user',
              content: `Du hast folgendes geantwortet. Stell sicher, dass du bei den künftigen Antworten den Studenten besser zu der Lösung leitest und nicht mehrmals die gleiche Antwort gibst. '${lastFeedbackRef.current}'`,
            },
          ] as ChatCompletionMessageParam[])
        : []),
      {
        role: 'user',
        content: `Der Schüler hat folgendes geantwortet: ${value}`,
      },
    ])
  }, [value, setAiMessages])

  console.log('Executed AI prompt: ', { aiMessages, aiData })

  useEffect(() => {
    if (aiExecuteStatus === ExecutePromptStatus.Success && aiData) {
      setAiFeedback(aiData.feedback)
      lastFeedbackRef.current = aiData.feedback
    } else if (aiExecuteStatus === ExecutePromptStatus.Error && errorMessage) {
      setAiFeedback(errorMessage)
    }
  }, [aiExecuteStatus, aiData, errorMessage])

  if (feedback && feedback.correct) {
    // Should we render it within the little birdy icon
    return (
      <ExerciseFeedback correct={feedback.correct}>
        {feedback.message}
      </ExerciseFeedback>
    )
  }

  return (
    <div className="ml-3 flex items-center rounded-lg border-2 border-blueish-200 bg-blueish-100 p-4 text-lg animate-in fade-in">
      <div className="serlo-p mb-0 ml-1 flex-1">
        {aiExecuteStatus === ExecutePromptStatus.Loading ? (
          <Skeleton />
        ) : (
          aiFeedback ?? exStrings.wrong
        )}
      </div>
      <Image
        src="/_assets/img/birdie.svg"
        alt="Feedback Birdie"
        width={50}
        height={50}
        className="ml-4"
      />
    </div>
  )
}

function Skeleton() {
  return (
    <div className="flex min-w-60 animate-pulse flex-col space-y-4">
      <div className="h-4 w-2/4 rounded bg-gray-300"></div>
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
    </div>
  )
}
