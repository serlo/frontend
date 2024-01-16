import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { useState } from 'react'

// TODO: Shouldn't import this from another plugin
import { Feedback } from '../../sc-mc-exercise/renderer/feedback'
import { cn } from '@/helper/cn'

interface BlankCheckButtonProps {
  isVisible: boolean
  feedback: Map<string, { isCorrect?: boolean | undefined }>
  onClick: () => void
}

export function BlankCheckButton(props: BlankCheckButtonProps) {
  const { isVisible, feedback, onClick } = props

  const exStrings = useInstanceData().strings.content.exercises

  // Used to show feedback when user clicked "Stimmts?" button
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  return (
    <div className="mt-2 flex">
      <button
        className={cn(
          'serlo-button-blue mr-3 h-8',
          isVisible ? '' : 'pointer-events-none opacity-0'
        )}
        onClick={() => {
          onClick()
          setShowFeedback(true)
        }}
      >
        {exStrings.check}
      </button>
      {showFeedback && (
        <Feedback
          correct={[...feedback].every((entry) => entry[1].isCorrect)}
        />
      )}
    </div>
  )
}
