import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { ExercisePluginStateContext } from './exercise-plugin-state-context'
import { createFeedbackBlock, PrototypeStateStore } from './prototype-state'
import { AiFeedback } from './types'
import { usePluginId } from './use-plugin-id'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

const responses = [
  // a
  {
    studentSolution: 'Students often have homework every day.',
    aiFeedback: {
      generalFeedback:
        'Dein Satz ist ein guter Anfang, um allgemeine Informationen zu geben. Allerdings fehlt noch deine persönliche Meinung.',
      isCorrect: false,
    },
  },
  {
    studentSolution:
      'Students often have homework every day. That is too often.',
    aiFeedback: {
      generalFeedback:
        'Dein Anfang enthält allgemeine Informationen und deine Meinung, was sehr gut ist. Du könntest jedoch eine der vorgeschlagenen "useful phrases" wie "I think" oder "I believe" verwenden, um deine Meinung klarer zu kennzeichnen. Weiter so!',
      isCorrect: false,
    },
  },
  {
    studentSolution:
      'Students often have homework every day. That is too often. ',
    aiFeedback: {
      generalFeedback:
        'Deine Lösung enthält allgemeine Informationen, aber es fehlt eine klare Formulierung deiner Meinung. Versuche, eine der "useful phrases" wie "I think" oder "I believe" zu verwenden, um deine Meinung deutlicher zu machen. Vielleicht schaust du dir nochmal den Lernschritt "Useful phrases & vocabulary" an, um mehr darüber zu erfahren.',
      isCorrect: false,
    },
  },
  {
    studentSolution:
      'Students often have homework every day, but I believe that is too often.',
    aiFeedback: {
      generalFeedback:
        'Deine Antwort ist sehr gut gelungen. Du hast sowohl allgemeine Informationen als auch deine Meinung klar ausgedrückt. Weiter so!',
      isCorrect: false,
    },
  },
  // b
  {
    studentSolution: 'Students must time for hobbies.',
    aiFeedback: {
      generalFeedback:
        'Dein Satz ist ein guter Anfang, aber er ist grammatikalisch nicht korrekt. Du könntest zum Beispiel sagen: "Students need time for hobbies."',
      isCorrect: false,
    },
  },
  {
    studentSolution: 'Students need time for hobbies. They are important.',
    aiFeedback: {
      generalFeedback:
        'Du hast einen guten Anfang gemacht, indem du die Wichtigkeit von Hobbys erwähnt hast. Versuche, deine Meinung weiter zu begründen, indem du erklärst, warum Hobbys wichtig sind.',
      isCorrect: false,
    },
  },
]

export function FeedbackButton({
  id,
  spinner,
}: {
  id: string
  spinner: boolean
}) {
  const silentmode = PrototypeStateStore.useState((s) => s.silentMode)
  const pluginId = usePluginId()
  // Get text area plugin state values
  const { solution, evaluationCriteria, additionalInfoForAi } =
    useTextAreaPluginStateValues()
  // Get text area plugin state (incl. set functions)
  const exerciseState = useContext(ExercisePluginStateContext)
  // Get client-side state
  const blocks = PrototypeStateStore.useState(
    (s) => s.textAreaPlugins[pluginId]?.textAreaBlocks || []
  )

  async function fetchFeedback() {
    const url = new URL('/api/ai/student-feedback', window.location.href)
    // Send the task description as stringified json.
    const exercise = JSON.stringify(exerciseState?.state.content)

    const studentSolution =
      blocks.find((block) => block.id === id)?.content || ''

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        exercise: exercise,
        solution: solution ?? 'keine Musterlösung',
        evaluationCriteria: evaluationCriteria ?? 'keine Bewertungskriterien',
        // Maybe do it per paragraph like in the original prototype?
        studentSolution: studentSolution,
        additionalInfoForAi: additionalInfoForAi ?? 'keine zusätzlichen Infos',
      }),
    })

    if (!response.ok) {
      console.error('Network response was not ok', response)
      return null
    }

    await response.json()

    //
    // return (await response.json()) as AiFeedback
    return responses.find((entry) => entry.studentSolution === studentSolution)
      ?.aiFeedback
  }

  async function handleKiButtonClick(pluginId: string) {
    PrototypeStateStore.update((s) => {
      const thisBlock = s.textAreaPlugins[pluginId].textAreaBlocks.find(
        (b) => b.id === id
      )
      if (thisBlock && thisBlock.type === 'text') {
        thisBlock.feedbackPending = true
      }
    })
    const feedback = await fetchFeedback()

    PrototypeStateStore.update((s) => {
      const textAreaBlocks = s.textAreaPlugins[pluginId].textAreaBlocks
      const index = textAreaBlocks.findIndex((block) => block.id === id)
      if (textAreaBlocks[index].type === 'text') {
        textAreaBlocks[index].feedbackPending = false
      }
      const nextBlock = textAreaBlocks.at(index + 1)
      if (!nextBlock || nextBlock.type !== 'feedback') {
        textAreaBlocks.splice(index + 1, 0, createFeedbackBlock(feedback))
        return
      }
      if (nextBlock && feedback && nextBlock.type === 'feedback') {
        nextBlock.content = feedback.generalFeedback
        nextBlock.isCorrect = feedback.isCorrect
      }
    })
  }
  if (silentmode) return null
  return (
    <>
      <button
        className="serlo-tooltip-trigger flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 opacity-0 transition-opacity hover:bg-purple-200  group-focus-within:opacity-100"
        onClick={() => handleKiButtonClick(pluginId)}
      >
        <EditorTooltip text="Hole Feedback von der KI" />
        {spinner ? (
          <FaIcon className="h-7 w-7 animate-spin-slow" icon={faSpinner} />
        ) : (
          <img src="/_assets/img/birdie.svg" className="h-7 w-7" />
        )}
      </button>
    </>
  )
}
