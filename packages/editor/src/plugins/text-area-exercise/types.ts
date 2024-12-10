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
  feedbackPending: boolean
}

export interface AiFeedback {
  feedback: string
}

export interface FeedbackText {
  type: 'text'
  text: string
  bold?: boolean
}
export interface FeedbackLink {
  type: 'link'
  text: string
  href: string
  linkPreview: {
    title: string
    image: string
  }
}
