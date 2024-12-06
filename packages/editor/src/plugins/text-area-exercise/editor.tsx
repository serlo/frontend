import { cn } from '@editor/utils/cn'
import { useState } from 'react'

import type { TextAreaExerciseProps } from '.'
import { AnimateChangeInHeight } from './animate-change-in-height'
import { HelpAndFeedbackSettings } from './help-and-feedback-settings'
import { TextAreaExerciseRenderer } from './renderer'
import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { TextAreaExerciseToolbar } from './toolbar'

export function TextAreaExerciseEditor(props: TextAreaExerciseProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  // const isPreviewActive = useIsPreviewActive()
  // const { focused } = props

  return (
    <TextAreaEditorContext.Provider value={props}>
      <TextAreaExerciseToolbar {...props} />
      <TextAreaExerciseRenderer isInEditor />
      <AnimateChangeInHeight className={cn('mt-8')}>
        <div
          className={cn(
            'flex flex-col items-center px-3 py-3',
            settingsOpen ? 'bg-editor-primary-100' : ''
          )}
        >
          <button
            onClick={() => setSettingsOpen(true)}
            disabled={settingsOpen}
            className={cn(
              'mb-3 rounded-md bg-editor-primary-100 px-16 pb-4 pt-4 font-bold',
              settingsOpen
                ? ''
                : 'hover:cursor-pointer hover:bg-editor-primary-200'
            )}
          >
            Lösungen und Hilfestellungen hinzufügen
          </button>
          {settingsOpen ? <HelpAndFeedbackSettings /> : null}
        </div>
      </AnimateChangeInHeight>
      {/* <button className={cn('serlo-button-edit-primary', 'mr-2')}>
        Musterlösung hinzufügen
        </button> */}
    </TextAreaEditorContext.Provider>
  )
}
