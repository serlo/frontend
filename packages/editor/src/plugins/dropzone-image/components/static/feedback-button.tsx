import { ExerciseFeedback } from '@editor/editor-ui/exercises/exercise-feedback'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'

import { FeedbackData } from '../../types'

interface FeedbackButtonProps {
  feedback: FeedbackData
  isButtonVisible: boolean
  onClick: () => void
}

export function FeedbackButton(props: FeedbackButtonProps) {
  const { feedback, isButtonVisible, onClick } = props

  const exStrings = useStaticStrings().plugins.exercise

  return (
    <div className="flex">
      {isButtonVisible ? (
        <button
          className="serlo-button-blue mr-3 h-8"
          onClick={onClick}
          data-qa="plugin-exercise-check-answer-button"
        >
          {exStrings.check}
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
