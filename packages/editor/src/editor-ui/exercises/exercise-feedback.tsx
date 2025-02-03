import { useStaticStrings } from '@editor/i18n/static-strings-provider'

export interface SolutionFeedbackProps {
  correct: boolean
  missedSome?: boolean
  customFeedback?: React.ReactNode
}

const correctEmojis = ['🥳', '🤩', '😎']
const incorrectEmojis = ['🐸', '🐼', '🐹', '🦊', '🐶']

export function ExerciseFeedback({
  correct,
  missedSome,
  customFeedback,
}: SolutionFeedbackProps) {
  const exStrings = useStaticStrings().plugins.exercise

  function getFallbackString() {
    if (correct) return exStrings.feedback.correct
    if (missedSome) return exStrings.feedback.missedSome
    const randomIndex = Math.floor(Math.random() * 6)
    return exStrings.feedback[
      ('incorrect' + randomIndex) as keyof typeof exStrings.feedback
    ]
  }
  const fallbackString = getFallbackString()
  const emoji = correct
    ? correctEmojis[Math.floor(Math.random() * correctEmojis.length)]
    : incorrectEmojis[Math.floor(Math.random() * incorrectEmojis.length)]

  return (
    <div className="ml-3 mt-1 flex text-lg animate-in fade-in">
      <span
        className="-mt-1 mr-0.5 text-2xl motion-safe:animate-in motion-safe:zoom-in"
        data-qa={`plugin-exercise-feedback-${
          correct ? 'correct' : 'incorrect'
        }`}
      >
        {emoji}
      </span>{' '}
      <div className="serlo-p mb-0 ml-1">
        {customFeedback ? (
          <>
            {missedSome && exStrings.feedback.missedSome} {customFeedback}
          </>
        ) : (
          fallbackString
        )}
      </div>
    </div>
  )
}
