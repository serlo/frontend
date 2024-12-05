export type Block = Text | Feedback

export interface Feedback {
  id: string
  type: 'feedback'
  content: string
  isCorrect: boolean
}
export interface Text {
  id: string
  type: 'text'
  content: string
  feedbackPending: boolean
}

export interface AiFeedback {
  isCorrect: boolean
  generalFeedback: string
}
