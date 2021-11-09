// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui/internal'
import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'
import * as React from 'react'

import {
  editorContent,
  entity,
  optionalSerializedChild,
  OptionalChild,
  entityType,
} from './common/common'
import { RevisionHistoryLoader } from './helpers/revision-history-loader'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent('exercise'),
  },
  {
    'text-solution': optionalSerializedChild('type-text-solution'),
  }
)

export const textExerciseTypePlugin: EditorPlugin<
  typeof textExerciseTypeState,
  { skipControls: boolean }
> = {
  Component: TextExerciseTypeEditor,
  state: textExerciseTypeState,
  config: {
    skipControls: false,
  },
}

export function TextExerciseTypeEditor(
  props: EditorPluginProps<
    typeof textExerciseTypeState,
    { skipControls: boolean }
  >
) {
  const { content, 'text-solution': textSolution } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <article className="text-exercise">
      {props.renderIntoToolbar(
        <RevisionHistoryLoader
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      {content.render()}
      {textSolution.id ? (
        <OptionalChild
          state={textSolution}
          removeLabel={editorStrings.textExercise.removeSolution}
          onRemove={() => {
            textSolution.remove()
          }}
        />
      ) : (
        <AddButton
          onClick={() => {
            textSolution.create()
          }}
        >
          {editorStrings.textExercise.createSolution}
        </AddButton>
      )}
      {props.config.skipControls ? null : (
        <ToolbarMain subscriptions {...props.state} />
      )}
    </article>
  )
}
