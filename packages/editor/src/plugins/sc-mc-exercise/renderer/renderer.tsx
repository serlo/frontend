import { McRenderer } from './mc-renderer'
import { ScRenderer } from './sc-renderer'

export interface ScMcExerciseRendererAnswer {
  isCorrect: boolean
  feedback: JSX.Element | null
  content: JSX.Element | null
  key: string
}

export interface ScMcExerciseRendererProps {
  isSingleChoice: boolean
  answers: ScMcExerciseRendererAnswer[]
  renderExtraAnswerContent?: (
    answer: ScMcExerciseRendererAnswer,
    hasFeedback: boolean
  ) => JSX.Element | null
  isPrintMode?: boolean
}

export function ScMcExerciseRenderer(props: ScMcExerciseRendererProps) {
  return props.isSingleChoice ? (
    <ScRenderer {...props} />
  ) : (
    <McRenderer {...props} />
  )
}
