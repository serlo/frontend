import { useInstanceData } from '@editor/utils/use-instance-data'
import type { ReactNode } from 'react'

export interface FeedbackProps {
  correct: boolean
  children?: ReactNode
  missedSome?: boolean
}

export function Feedback({ children, correct, missedSome }: FeedbackProps) {
  const exStrings = useInstanceData().strings.content.exercises
  const fallbackString =
    exStrings[correct ? 'correct' : missedSome ? 'missedSome' : 'wrong']

  return (
    <div className="ml-3 mt-1 flex text-lg animate-in fade-in">
      <span
        className="-mt-1 mr-0.5 text-2xl motion-safe:animate-in motion-safe:zoom-in"
        data-qa={`plugin-exercise-feedback-${
          correct ? 'correct' : 'incorrect'
        }`}
      >
        {correct ? '🎉' : '✋'}
      </span>{' '}
      <div className="serlo-p mb-0 ml-1">
        {children ? (
          <>
            {missedSome && exStrings.missedSome} {children}
          </>
        ) : (
          fallbackString
        )}
      </div>
    </div>
  )
}
