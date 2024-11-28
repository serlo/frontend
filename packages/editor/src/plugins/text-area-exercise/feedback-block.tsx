import { useContext } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { StateContext } from './state-context'
import { Feedback, Text } from './types'

export function FeedbackBlock({ id, content, type }: Feedback) {
  return <div>Feedback</div>
}

export function createFeedbackBlock(): Feedback {
  return { id: uuid_v4(), type: 'feedback', content: '' }
}
