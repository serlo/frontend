import { useState } from 'react'

import type { TextAreaExerciseProps } from '.'
import { HelpAndFeedbackSettings } from './help-and-feedback-settings'
import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { TextAreaExerciseToolbar } from './toolbar'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <TextAreaEditorContext.Provider value={props}>
      <TextAreaExerciseToolbar {...props} />
      <TextAreaExerciseRenderer />
      {settingsOpen ? (
        <HelpAndFeedbackSettings />
      ) : (
        <div className="flex w-full">
          <button
            onClick={() => setSettingsOpen(true)}
            className="mx-auto my-8 rounded-md bg-editor-primary-100 px-16 pb-2 pt-4 hover:cursor-pointer hover:bg-editor-primary-200"
          >
            Hilfe und Feedback hinzufügen
          </button>
        </div>
      )}
      {/* <button className={cn('serlo-button-edit-primary', 'mr-2')}>
        Musterlösung hinzufügen
      </button> */}
    </TextAreaEditorContext.Provider>
  )
}
