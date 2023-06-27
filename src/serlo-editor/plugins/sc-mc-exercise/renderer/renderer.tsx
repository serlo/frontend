import { ScMcExerciseProps } from '..'
import { ScMcRendererInteractive } from '../renderer-interactive'
import { useInstanceData } from '@/contexts/instance-context'

export function ScMcExerciseRenderer(props: ScMcRendererProps) {
  const { strings } = useInstanceData()

  return (
    <ScMcRendererInteractive
      i18nWrong={strings.content.exercises.wrong}
      i18nCorrect={strings.content.exercises.correct}
      {...props}
      getFeedback={({ mistakes, missingSolutions }) => {
        if (mistakes > 0 && mistakes === missingSolutions) {
          return strings.content.exercises.missedSome
        }

        return undefined
      }}
      nextButtonStateAfterSubmit={({ button, answer }) => {
        return {
          selected: button.selected && answer.isCorrect.value,
          showFeedback: button.selected,
        }
      }}
      showFeedback
    />
  )
}

export type ScMcRendererProps = ScMcExerciseProps & {
  isEmpty: (id: string) => boolean
}
