import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { createFeedbackBlock } from './feedback-block'
import { StateContext } from './state-context'
import { createTextBlock } from './text-block'
import { Block } from './types'

export function FeedbackButton({ id }: { id: string }) {
  const { state, setState } = useContext(StateContext)

  // TOOO: Add possibility to stop fetching feedback
  // const fetchFeedback = useMutation({
  //   mutationFn: async () => {
  //     // const url = new URL('/api/generate-feedback', window.location.href)

  //     // url.searchParams.append('exercise', exercise)
  //     // url.searchParams.append('solution', solution)
  //     // url.searchParams.append('studentSolution', JSON.stringify(paragraphs))

  //     // const response = await fetch(url.toString(), { method: 'POST' })

  //     // if (!response.ok) {
  //     //   throw new Error('Network response was not ok')
  //     // }

  //     // return response.json() as Promise<Feedback>
  //     console.log('Fetch')
  //   },
  //   onSuccess: (data) => {
  //     // TODO
  //   },
  // })

  function handleKiButtonClick() {
    setState((oldState) => {
      const blocks = oldState.blocks
      const index = blocks.findIndex((block) => block.id === id)
      const nextBlock = blocks.at(index + 1)
      // Only one feedback block after text block
      if (nextBlock && nextBlock.type === 'feedback') return oldState
      const endSlice = blocks.slice(index + 1) ?? [createTextBlock()]
      const newBlocks = [
        ...blocks.slice(0, index + 1),
        createFeedbackBlock(),
        ...endSlice,
      ]
      return {
        ...oldState,
        blocks: newBlocks,
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
