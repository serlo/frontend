import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { ExercisePluginStateContext } from './exercise-plugin-state-context'
import { createFeedbackBlock, PrototypeStateStore } from './prototype-state'
import { AiFeedback } from './types'
import { usePluginId } from './use-plugin-id'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

const responses: {
  studentSolution: string
  aiFeedback: AiFeedback
}[] = [
  // a
  {
    studentSolution: 'Students often have homework every day.',
    aiFeedback: {
      feedback: [
        {
          type: 'text',
          text: 'Dein Satz ist ein guter Anfang, um allgemeine Informationen zu geben. Allerdings ',
        },
        {
          type: 'text',
          bold: true,
          text: 'fehlt noch deine persönliche Meinung',
        },
        {
          type: 'text',
          text: '.',
        },
      ],
      isCorrect: false,
    },
  },
  {
    studentSolution:
      'Students often have homework every day. That is too often.',
    aiFeedback: {
      feedback: [
        {
          type: 'text',
          text: 'Dein Anfang enthält allgemeine Informationen und deine Meinung, was sehr gut ist. Du könntest jedoch eine der vorgeschlagenen "useful phrases" wie "I think" oder "I believe" verwenden, um deine Meinung klarer zu kennzeichnen. Weiter so!',
        },
      ],
      isCorrect: false,
    },
  },
  {
    studentSolution:
      'Students often have homework every day. That is too often. ',
    aiFeedback: {
      feedback: [
        {
          type: 'text',
          text: 'Deine Lösung enthält allgemeine Informationen, aber es ',
        },
        {
          type: 'text',
          bold: true,
          text: 'fehlt eine klare Formulierung deiner Meinung',
        },
        {
          type: 'text',
          text: '. Versuche, eine der "useful phrases" wie ',
        },
        {
          type: 'text',
          bold: true,
          text: '"I think"',
        },
        {
          type: 'text',
          text: ' oder ',
        },
        {
          type: 'text',
          bold: true,
          text: '"I believe"',
        },
        {
          type: 'text',
          text: ' zu verwenden, um deine Meinung deutlicher zu machen. Vielleicht schaust du dir nochmal den ',
        },
        {
          type: 'link',
          text: 'Lernpfad-Schritt "Useful phrases & vocabulary"',
          href: 'https://frontend-git-feat-lernpfad-prototype-serlo.vercel.app/___lernpfad_prototype',
          linkPreview: {
            title: 'Useful phrases & vocabulary',
            image:
              '_assets/img/meta/microadaptivity-useful-phrases-and-vocabulary.png',
          },
        },
        {
          type: 'text',
          text: ' an, um mehr darüber zu erfahren.',
        },
      ],
      isCorrect: false,
    },
  },
  {
    studentSolution:
      'Students often have homework every day, but I believe that is too often.',
    aiFeedback: {
      feedback: [
        {
          type: 'text',
          text: 'Deine Antwort ist sehr gut gelungen. Du hast sowohl allgemeine Informationen als auch deine Meinung klar ausgedrückt. Weiter so!',
        },
      ],
      isCorrect: false,
    },
  },
  // b
  {
    studentSolution: 'Students must time for hobbies.',
    aiFeedback: {
      feedback: [
        {
          type: 'text',
          text: 'Dein Satz ist ein guter Anfang, aber er ist grammatikalisch nicht korrekt. Du könntest zum Beispiel sagen: "Students need time for hobbies."',
        },
      ],
      isCorrect: false,
    },
  },
  {
    studentSolution: 'Students need time for hobbies. They are important.',
    aiFeedback: {
      feedback: [
        {
          type: 'text',
          text: 'Du hast einen guten Anfang gemacht, indem du die Wichtigkeit von Hobbys erwähnt hast. Versuche, deine Meinung weiter zu begründen, indem du erklärst, warum Hobbys wichtig sind.',
        },
      ],
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

    // const response = await fetch(url.toString(), {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     exercise: exercise,
    //     solution: solution ?? 'keine Musterlösung',
    //     evaluationCriteria: evaluationCriteria ?? 'keine Bewertungskriterien',
    //     // Maybe do it per paragraph like in the original prototype?
    //     studentSolution: studentSolution,
    //     additionalInfoForAi: additionalInfoForAi ?? 'keine zusätzlichen Infos',
    //   }),
    // })

    // if (!response.ok) {
    //   throw new Error('Network response was not ok')
    // }

    // await response.json()

    const predefinedResponse = responses.find(
      (entry) => entry.studentSolution === studentSolution
    )

    if (!predefinedResponse) throw new Error('Response missing')

    //
    // return (await response.json()) as AiFeedback
    return predefinedResponse.aiFeedback
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
        nextBlock.content = feedback.feedback
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
