import { createFeedbackBlock, PrototypeStateStore } from './prototype-state'
import { AiFeedback } from './types'

export function FeedbackButton({
  id,
  exercise,
  solution,
  studentSolution,
}: {
  id: string
  exercise: string
  solution: string
  studentSolution: string
}) {
  async function fetchFeedback() {
    const url = new URL('/api/ai/student-feedback', window.location.href)

    url.searchParams.append('exercise', exercise)
    url.searchParams.append('solution', solution)
    // Maybe do it per paragraph like in the original prototype?
    url.searchParams.append('studentSolution', studentSolution)

    const response = await fetch(url.toString(), { method: 'POST' })

    if (!response.ok) {
      console.error('Network response was not ok')
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
