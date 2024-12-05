import { FaIcon } from '@editor/editor-ui/fa-icon'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'

import { ExercisePluginStateContext } from './exercise-plugin-state-context'
import { createFeedbackBlock, PrototypeStateStore } from './prototype-state'
import { AiFeedback } from './types'
import { usePluginId } from './use-plugin-id'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

export function FeedbackButton({
  id,
  spinner,
}: {
  id: string
  spinner: boolean
}) {
  const pluginId = usePluginId()
  // Get text area plugin state values
  const { solution, evaluationCriteria } = useTextAreaPluginStateValues()
  // Get text area plugin state (incl. set functions)
  const exerciseState = useContext(ExercisePluginStateContext)
  // Get client-side state
  const blocks = PrototypeStateStore.useState(
    (s) => s.textAreaPlugins[pluginId]?.textAreaBlocks || []
  )

  async function fetchFeedback() {
    const url = new URL('/api/ai/student-feedback', window.location.href)
    // Careful: Formatting in exercise content does not work. Only one text plugin without any unformatted works.
    // TODO: If necessary, build text from slate node structure.
    // @ts-expect-error Pick text without type checking for now
    const contentText = exerciseState?.state.content.state[0].state[0]
      .children[0].text as string

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        exercise: contentText,
        solution: solution ?? 'keine Musterlösung',
        evaluationCriteria: evaluationCriteria ?? 'keine Bewertungskriterien',
        // Maybe do it per paragraph like in the original prototype?
        studentSolution: blocks.find((block) => block.id === id)?.content || '',
      }),
    })

    if (!response.ok) {
      console.error('Network response was not ok', response)
      return null
    }

    return (await response.json()) as AiFeedback
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
      if (!s.textAreaPlugins[pluginId]) {
        s.textAreaPlugins[pluginId] = {
          textAreaBlocks: [createFeedbackBlock(feedback)],
        }
      } else {
        const textAreaBlocks = s.textAreaPlugins[pluginId].textAreaBlocks
        const index = textAreaBlocks.findIndex((block) => block.id === id)
        if (textAreaBlocks[index].type === 'text') {
          textAreaBlocks[index].feedbackPending = false
        }
        const nextBlock = textAreaBlocks.at(index + 1)
        if (!nextBlock || nextBlock.type !== 'feedback') {
          textAreaBlocks.splice(index + 1, 0, createFeedbackBlock(feedback))
          //const endSlice = blocks.slice(index + 1) ?? [createTextBlock()]
        }
      }
    })
  }
  return (
    <>
      {spinner ? (
        <button className="h-8 w-8 animate-spin-slow">
          <FaIcon icon={faSpinner} />
        </button>
      ) : (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-200 opacity-0 transition-opacity hover:bg-purple-300 group-focus-within:opacity-100"
          onClick={() => handleKiButtonClick(pluginId)}
        >
          <img src="/_assets/img/birdie.svg" className="h-7 w-7" />
        </button>
      )}
    </>
  )
}
