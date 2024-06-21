import { ExerciseFeedback } from '@editor/editor-ui/exercises/exercise-feedback'

import { FeedbackData } from '../../types'
import { useInstanceData } from '@/contexts/instance-context'

interface FeedbackButtonProps {
  feedback: FeedbackData
  isButtonVisible: boolean
  onClick: () => void
}

export function FeedbackButton(props: FeedbackButtonProps) {
  const { feedback, isButtonVisible, onClick } = props

  const exercisesStrings = useInstanceData().strings.content.exercises

  return (
    <div className="flex">
      {isButtonVisible ? (
        <button
          className="serlo-button-blue mr-3 h-8"
          onClick={onClick}
          data-qa="plugin-exercise-check-answer-button"
        >
          {exercisesStrings.check}
        </button>
      ) : null}
      {feedback !== FeedbackData.Unset ? (
        <ExerciseFeedback
          correct={feedback === FeedbackData.Correct}
          missedSome={feedback === FeedbackData.MissedSome}
        />
      ) : null}
    </div>
  )
}
