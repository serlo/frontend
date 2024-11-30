import type { TextAreaExerciseProps } from '.'
import { HelpAndFeedbackSettings } from './help-and-feedback-settings'
import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaPluginStateContext } from './text-area-plugin-state-context'
import { TextAreaExerciseToolbar } from './toolbar'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  return (
    <TextAreaPluginStateContext.Provider value={props}>
      <TextAreaExerciseToolbar {...props} />
      <TextAreaExerciseRenderer />
      <HelpAndFeedbackSettings />
      {/* <button className={cn('serlo-button-edit-primary', 'mr-2')}>
        Musterlösung hinzufügen
      </button> */}
    </TextAreaPluginStateContext.Provider>
  )
}
