import { useEffect, useMemo, useRef, useState } from 'react'

import { useExerciseContext } from '@/contexts/exercise-context'
import { ChatCompletionMessageParam } from '@/fetcher/graphql-types/operations'

interface InputExerciseAnswer {
  value: string
  isCorrect: boolean
  feedback: JSX.Element | null
}

export function useInputFeedbackAiExerciseState(
  correctAnswers: InputExerciseAnswer[] = []
) {
  // Only when the value of the user changes, we want to recompute the AI
  // messages and add the previous feedback. This is why we store the AI feedback in the ref
  const lastAiFeedbackRef = useRef<string | null>(null)
  const { question, steps, strategy: solution } = useExerciseContext() || {}

  const hasSolutionSteps = steps?.trim().length > 0
  const hasSolution = solution?.trim().length > 0

  // Change to a map, reduce is no longer be needed
  const solutions = correctAnswers.reduce<ChatCompletionMessageParam[]>(
    (acc, current) => [
      ...acc,
      {
        role: 'system',
        content: `Eine mögliche von Autoren hinterlegte Lösung: ${current.value}`,
      },
    ],
    []
  )

  const initialMessages = useMemo<ChatCompletionMessageParam[]>(
    () =>
      question
        ? [
            {
              role: 'system',
              content:
                // 'Du bist ein innovativer KI-Tutor auf einer Lernplattform für Mathematik. Schüler bearbeiten Aufgaben auf deiner Plattform, um ihr Wissen zu überprüfen und zu vertiefen. Gib ihnen Feedback für ihre Ergebnisse bei Mathematikaufgaben. Ist das Ergebnis einer Aufgabe richtig, gib das Feedback: "Sehr gut!" Ist das Ergebnis nicht richtig, gib das Feedback: "Das ist nicht richtig.", wobei hier noch ein Satz folgen soll, der dem Schüler hilft, zum richtigen Ergebnis zu kommen. Verrate nicht die Lösung. Verwende beim Geben von Feedback einfache Sprache und vermeide es, Fachbegriffe zu verwenden. Nenne die einfachste Methode, die zum Ergebnis der Rechnung führt. Nenne UNBEDINGT die Formel zum Lösen der Aufgabe. Gib die Antwort in JSON an.',
                'Du bist ein KI-Tutor auf einer Lernplattform für Mathematik. Schüler bearbeiten Aufgaben auf deiner Plattform, um ihr Wissen zu überprüfen und zu vertiefen. Gib ihnen Feedback für ihre Ergebnisse bei Mathematikaufgaben. Ist das Ergebnis einer Aufgabe richtig, gib das Feedback: "Sehr gut!" Ist das Ergebnis nicht richtig, gib individuelles Feedback welcher Fehler gemacht wurde und ein Satz der dem Schüler hilft, zum richtigen Ergebnis zu kommen. Verrate nicht die Lösung. Verwende beim Geben von Feedback einfache Sprache und vermeide es, Fachbegriffe zu verwenden. Nenne die einfachste Methode, die zum Ergebnis der Rechnung führt. Falls nötig, nenne wichtige Formeln. Wichtig: Überlege was der Schüler falsch gemacht hat und passe das Feedback der Lösung an.  Das Ergebnis soll unabhänging von "." oder "," als korrekt gewertet werden z.B 30/2=15.0 oder 15,0 sollte als korrekt gesehen werden. Bewerte Lösungen, die einfach nur die Frage widergeben, als falsch. Gib die Antwort in JSON als value des keys "feedback" an.',
            },
            {
              role: 'user',
              content: `Die Frage ist: ${question}`,
            },
            ...solutions,
            ...(hasSolution || hasSolutionSteps
              ? ([
                  {
                    role: 'user',
                    content: `Autor*innen der Lernplattform haben ${
                      hasSolution ? 'eine Lösung' : ''
                    }${hasSolution && hasSolutionSteps ? ' und ' : ''}${
                      hasSolutionSteps ? 'Lösungsschritte' : ''
                    } mitgeschrieben. Hierbei handelt es sich NICHT um die Eingabe des Schülers welche noch folgen wird! Bitte berücksichtige den Lösungsweg bei der Bewertung der Antwort und gib dem Schüler einen kurzen Hinweis um auf die richtige Lösung zu kommen. ${hasSolution && `Lösung: ${solution}`} ${hasSolutionSteps && `Lösungsschritte: ${steps}`}`,
                  },
                ] as ChatCompletionMessageParam[])
              : []),
          ]
        : [],
    [hasSolution, hasSolutionSteps, question, solution, steps]
  )

  const [aiMessages, setAiMessages] = useState<ChatCompletionMessageParam[]>([])

  useEffect(() => {
    if (question) {
      setAiMessages(initialMessages)
    }
  }, [initialMessages, question])

  return {
    aiMessages,
    setAiMessages,
    lastAiFeedbackRef,
  }
}
