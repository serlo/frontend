import { useContext } from 'react'

import { ExercisePluginStateContext } from './exercise-plugin-state-context'
import { createFeedbackBlock, PrototypeStateStore } from './prototype-state'
import { AiFeedback } from './types'
import { useTextAreaPluginStateValues } from './use-text-area-plugin-state-values'

export function FeedbackButton({ id }: { id: string }) {
  // Get text area plugin state values
  const { solution, evaluationCriteria } = useTextAreaPluginStateValues()
  // Get text area plugin state (incl. set functions)
  const exerciseState = useContext(ExercisePluginStateContext)
  // Get client-side state
  const blocks = PrototypeStateStore.useState((s) => s.textAreaBlocks)

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
        solution,
        evaluationCriteria,
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

  async function handleKiButtonClick() {
    const feedback = await fetchFeedback()

    PrototypeStateStore.update((s) => {
      const index = s.textAreaBlocks.findIndex((block) => block.id === id)
      const nextBlock = s.textAreaBlocks.at(index + 1)
      if (!nextBlock || nextBlock.type !== 'feedback') {
        s.textAreaBlocks.splice(index + 1, 0, createFeedbackBlock(feedback))
        //const endSlice = blocks.slice(index + 1) ?? [createTextBlock()]
      }
    })
  }
  return (
    <>
      <button className="" onClick={handleKiButtonClick}>
        <div>🐦</div>
      </button>
    </>
  )
}
