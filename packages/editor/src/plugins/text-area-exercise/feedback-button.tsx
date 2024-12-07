import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
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
        className="serlo-tooltip-trigger flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 opacity-0 transition-opacity hover:bg-purple-300  group-focus-within:opacity-100"
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
