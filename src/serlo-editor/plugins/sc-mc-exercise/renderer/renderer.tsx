import { McRenderer } from './mc-renderer'
import { ScRenderer } from './sc-renderer'
import { ExerciseSubmissionData } from '@/helper/exercise-submission'

export interface ScMcExerciseRendererAnswer {
  isCorrect: boolean
  feedback: JSX.Element | null
  content: JSX.Element | null
}

export interface ScMcExerciseRendererProps {
  isSingleChoice: boolean
  idBase: string
  answers: ScMcExerciseRendererAnswer[]
  onEvaluate?: (correct: boolean, type: ExerciseSubmissionData['type']) => void
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
