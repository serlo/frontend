import { useEffect } from 'react'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { PrototypeStateStore } from './prototype-state'
import { Feedback, Text } from './types'

export function FeedbackBlock({ id, content }: Feedback) {
  useEffect(() => {
    if (content === '') {
      setTimeout(() => {
        PrototypeStateStore.update((s) => {
          s.textAreaBlocks.forEach((block) => {
            if (block.id === id) {
              block.content = '⟳'
            }
          })
        })
      }, 300)
    }
    if (content === '⟳') {
      setTimeout(() => {
        PrototypeStateStore.update((s) => {
          s.textAreaBlocks.forEach((block) => {
            if (block.id === id) {
              block.content =
                'Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback '
            }
          })
        })
      }, 1000)
    }
  })

  return (
    <div id={id} className="m-3 rounded-md bg-brand p-3 text-white">
      <AnimateChangeInHeight>{content}</AnimateChangeInHeight>
    </div>
  )
}
