import type { TextAreaExerciseProps } from '.'
import { HelpAndFeedbackSettings } from './help-and-feedback-settings'
import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaExerciseToolbar } from './toolbar'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  return (
    <>
      <TextAreaExerciseToolbar {...props} />
      <TextAreaExerciseRenderer
        scaffoldingEnabled={props.state.scaffoldingEnabled.value}
      />
      <HelpAndFeedbackSettings />
      {/* <button className={cn('serlo-button-edit-primary', 'mr-2')}>
        Musterlösung hinzufügen
      </button> */}
    </>
  )
}
