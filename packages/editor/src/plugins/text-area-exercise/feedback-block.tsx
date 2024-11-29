import { useEffect } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { AnimateChangeInHeight } from './animate-change-in-height'
import type { AiFeedback } from './feedback-button'
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

export function createFeedbackBlock(
  feedback: AiFeedback | null = null
): Feedback {
  if (!feedback) {
    return { id: uuid_v4(), type: 'feedback', content: 'failed' }
  }

  return { id: uuid_v4(), type: 'feedback', content: feedback.generalFeedback }
}
