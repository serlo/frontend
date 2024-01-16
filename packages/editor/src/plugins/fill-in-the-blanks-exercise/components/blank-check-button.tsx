import { SolutionFeedback } from '@editor/editor-ui/exercises/solution-feedback'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

import { cn } from '@/helper/cn'

interface BlankCheckButtonProps {
  isVisible: boolean
  feedback: Map<string, { isCorrect?: boolean | undefined }>
  isFeedbackVisible: boolean
  onClick: () => void
}

export function BlankCheckButton(props: BlankCheckButtonProps) {
  const { isVisible, feedback, isFeedbackVisible, onClick } = props

  const exercisesStrings = useInstanceData().strings.content.exercises

  const className = cn(
    'serlo-button-blue mr-3 h-8',
    isVisible ? '' : 'pointer-events-none opacity-0'
  )

  const isCorrect = [...feedback].every((entry) => entry[1].isCorrect)

  return (
    <div className="mt-2 flex">
      <button className={className} onClick={onClick}>
        {exercisesStrings.check}
      </button>
      {isFeedbackVisible ? <SolutionFeedback correct={isCorrect} /> : null}
    </div>
  )
}
