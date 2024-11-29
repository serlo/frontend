import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { FeedbackBlock } from './feedback-block'
import { StateContext } from './state-context'
import { TextBlock } from './text-block'

// All text and feedback blocks
export function Blocks() {
  const globalContext = useContext(StateContext)
  const blocks = globalContext.state.blocks
  const queryClient = new QueryClient()

  return (
    <div className="mx-side my-5 flex w-full flex-col rounded-xl border border-brand bg-brand-50 p-2">
      <QueryClientProvider client={queryClient}>
        {blocks.map((block) =>
          block.type === 'text' ? (
            <TextBlock key={block.id} {...block} />
          ) : block.type === 'feedback' ? (
            <FeedbackBlock key={block.id} {...block} />
          ) : (
            <div>Unknown type</div>
          )
        )}
      </QueryClientProvider>
    </div>
  )
}
