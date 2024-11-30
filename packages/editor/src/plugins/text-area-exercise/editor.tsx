import type { TextAreaExerciseProps } from '.'
import { HelpAndFeedbackSettings } from './help-and-feedback-settings'
import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { TextAreaExerciseToolbar } from './toolbar'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  return (
    <TextAreaEditorContext.Provider value={props}>
      <TextAreaExerciseToolbar {...props} />
      <TextAreaExerciseRenderer />
      <HelpAndFeedbackSettings />
      {/* <button className={cn('serlo-button-edit-primary', 'mr-2')}>
        Musterlösung hinzufügen
      </button> */}
    </TextAreaEditorContext.Provider>
  )
}
