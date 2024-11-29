import { useContext, useEffect } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { AiFeedback } from './feedback-button'
import { StateContext } from './state-context'
import { Feedback, Text } from './types'

export function FeedbackBlock({ id, content, type }: Feedback) {
  const { state, setState } = useContext(StateContext)

  useEffect(() => {
    if (content === '') {
      setTimeout(() => {
        setState((oldState) => {
          return {
            ...oldState,
            blocks: oldState.blocks.map((block) => {
              if (block.id !== id) {
                return block
              }
              return { ...block, content: '⟳' }
            }),
          }
        })
      }, 300)
    }
    if (content === '⟳') {
      setTimeout(() => {
        setState((oldState) => {
          return {
            ...oldState,
            blocks: oldState.blocks.map((block) => {
              if (block.id !== id) {
                return block
              }
              return {
                ...block,
                content:
                  'Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback Feedback ',
              }
            }),
          }
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
