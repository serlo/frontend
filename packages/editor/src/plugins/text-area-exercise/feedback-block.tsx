import { useContext } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { AiFeedback } from './feedback-button'
import { StateContext } from './state-context'
import { Feedback, Text } from './types'

export function FeedbackBlock({ id, content, type }: Feedback) {
  return <div id={id}>Feedback Content: {content}</div>
}

export function createFeedbackBlock(
  feedback: AiFeedback | null = null
): Feedback {
  if (!feedback) {
    return { id: uuid_v4(), type: 'feedback', content: 'failed' }
  }

  return { id: uuid_v4(), type: 'feedback', content: feedback.generalFeedback }
}
