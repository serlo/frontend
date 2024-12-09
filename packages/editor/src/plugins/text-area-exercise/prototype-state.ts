import { Store } from 'pullstate'
import { v4 as uuid_v4 } from 'uuid'

import { Block, Text, Feedback, FeedbackText, FeedbackLink } from './types'

interface TextAreaPluginState {
  textAreaBlocks: Block[]
  evaluationCriteria: string  
  solution: string  
  exercise: string  
}

interface PrototypeState {
  textAreaPlugins: {
    [id: string]: TextAreaPluginState
  }
  silentMode: boolean
  __is_starting_up: boolean
}

export const PrototypeStateStore = new Store<PrototypeState>({
  textAreaPlugins: {},
  silentMode: false,
  __is_starting_up: true,
})

export function createFeedbackBlock(feedback: {
  feedback: (FeedbackText | FeedbackLink)[]
  isCorrect: boolean
}): Feedback {
  if (!feedback) {
    return {
      id: uuid_v4(),
      type: 'feedback',
      content: [
        { type: 'text', text: 'Leider konnte unsere KI kein Feedback geben' },
      ],
      isCorrect: false,
    }
  }

  return {
    id: uuid_v4(),
    type: 'feedback',
    isCorrect: feedback.isCorrect,
    content: feedback.feedback,
  }
}

export function createTextBlock(): Text {
  return { id: uuid_v4(), type: 'text', content: '', feedbackPending: false }
}
