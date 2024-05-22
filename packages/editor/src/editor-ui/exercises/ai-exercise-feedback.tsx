import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useEffect, useMemo, useState } from 'react'

import {
  useExecuteAIPrompt,
  ExecutePromptStatus,
  ChatCompletionMessageParam,
} from '../../../../../apps/web/src/components/exercise-generation/exercise-generation-wizard/execute-ai-prompt'
import { useExerciseContext } from '@/contexts/exercise-context'

interface AIExerciseFeedbackProps {
  value: string
}

export function AIExerciseFeedback({ value }: AIExerciseFeedbackProps) {
  const { question, steps, strategy: solution } = useExerciseContext()
  const exStrings = useInstanceData().strings.content.exercises

  const hasSolutionSteps = steps.trim().length > 0
  const hasSolution = solution.trim().length > 0

  const aiMessages = useMemo<ChatCompletionMessageParam[]>(
    () => [
      {
        role: 'system',
        content:
          // 'Du bist ein innovativer KI-Tutor auf einer Lernplattform für Mathematik. Schüler bearbeiten Aufgaben auf deiner Plattform, um ihr Wissen zu überprüfen und zu vertiefen. Gib ihnen Feedback für ihre Ergebnisse bei Mathematikaufgaben. Ist das Ergebnis einer Aufgabe richtig, gib das Feedback: "Sehr gut!" Ist das Ergebnis nicht richtig, gib das Feedback: "Das ist nicht richtig.", wobei hier noch ein Satz folgen soll, der dem Schüler hilft, zum richtigen Ergebnis zu kommen. Verrate nicht die Lösung. Verwende beim Geben von Feedback einfache Sprache und vermeide es, Fachbegriffe zu verwenden. Nenne die einfachste Methode, die zum Ergebnis der Rechnung führt. Nenne UNBEDINGT die Formel zum Lösen der Aufgabe. Gib die Antwort in JSON an.',
          'Du bist ein innovativer KI-Tutor auf einer Lernplattform für Mathematik. Schüler bearbeiten Aufgaben auf deiner Plattform, um ihr Wissen zu überprüfen und zu vertiefen. Gib ihnen Feedback für ihre Ergebnisse bei Mathematikaufgaben. Ist das Ergebnis einer Aufgabe richtig, gib das Feedback: "Sehr gut!" Ist das Ergebnis nicht richtig, gib das Feedback: "Das ist nicht richtig.", wobei hier noch ein Satz folgen soll, der dem Schüler hilft, zum richtigen Ergebnis zu kommen. Verrate nicht die Lösung. Verwende beim Geben von Feedback einfache Sprache und vermeide es, Fachbegriffe zu verwenden. Nenne die einfachste Methode, die zum Ergebnis der Rechnung führt. Falls nötig, nenne wichtige Formeln. Wichtig: Überlege was der Schüler falsch gemacht hat und passe das Feedback der Lösung an. Gib die Antwort in JSON als value des keys "feedback" an.',
      },
      {
        role: 'user',
        content: `Die Frage war: ${question}`,
      },
      ...(hasSolution || hasSolutionSteps
        ? ([
            {
              role: 'user',
              content: `Autor*innen der Lernplattform haben ${
                hasSolution ? 'eine Lösung' : ''
              }${hasSolution && hasSolutionSteps ? ' und ' : ''}${
                hasSolutionSteps ? 'Lösungsschritte' : ''
              } mitgeschrieben. Bitte berücksichtige dies bei der Bewertung der Antwort und gib dem Schüler einen kurzen Hinweis zur richtigen Lösung.`,
            },
            ...(hasSolution
              ? [{ role: 'user', content: `Lösung: ${solution}` }]
              : []),
            ...(hasSolutionSteps
              ? [
                  {
                    role: 'user',
                    content: `Lösungsschritte: ${steps}`,
                  },
                ]
              : []),
          ] as ChatCompletionMessageParam[])
        : []),
      {
        role: 'user',
        content: `Der Schüler hat folgendes geantwortet: ${value}`,
      },
    ],
    [value, question, hasSolution, hasSolutionSteps, solution, steps]
  )

  const {
    data: aiData,
    status: aiExecuteStatus,
    errorMessage,
  } = useExecuteAIPrompt<{ feedback: string }>({
    messages: aiMessages,
    submitEventPrefix: 'input-exercise-feedback',
    skipAuth: true,
  })

  console.log('Executed AI prompt: ', { aiMessages, aiData })

  const [aiFeedback, setAiFeedback] = useState<string | null>(null)

  useEffect(() => {
    if (aiExecuteStatus === ExecutePromptStatus.Success && aiData) {
      setAiFeedback(aiData.feedback)
    } else if (aiExecuteStatus === ExecutePromptStatus.Error && errorMessage) {
      setAiFeedback(errorMessage)
    }
  }, [aiExecuteStatus, aiData, errorMessage])

  if (aiExecuteStatus === ExecutePromptStatus.Loading) {
    return <div className="ml-3 mt-1">Loading KI feedback...</div>
  }

  return (
    <div className="ml-3 mt-1 flex text-lg animate-in fade-in">
      <div className="serlo-p mb-0 ml-1">{aiFeedback ?? exStrings.wrong}</div>
    </div>
  )
}
