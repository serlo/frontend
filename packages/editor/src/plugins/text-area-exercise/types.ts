export type Block = Text | Feedback

export interface Feedback {
  id: string
  type: 'feedback'
  content: string
}
export interface Text {
  id: string
  type: 'text'
  content: string
}

export interface AiFeedback {
  isCorrect: boolean
  generalFeedback: string
}
