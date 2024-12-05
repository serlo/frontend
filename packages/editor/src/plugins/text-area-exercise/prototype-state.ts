import { Store } from 'pullstate'
import { v4 as uuid_v4 } from 'uuid'

import { Block, Text, AiFeedback, Feedback } from './types'

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
}

export const PrototypeStateStore = new Store<PrototypeState>({
  textAreaPlugins: {},
  silentMode: false,
})

export function createFeedbackBlock(
  feedback: AiFeedback | null = null
): Feedback {
  if (!feedback) {
    return {
      id: uuid_v4(),
      type: 'feedback',
      content: 'Leider konnte unsere KI kein Feedback geben',
    }
  }

  return { id: uuid_v4(), type: 'feedback', content: feedback.generalFeedback }
}

export function createTextBlock(): Text {
  return { id: uuid_v4(), type: 'text', content: '', feedbackPending: false }
}
