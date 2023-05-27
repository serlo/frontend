// eslint-disable-next-line import/no-internal-modules
import { AddButton } from '@edtr-io/editor-ui'
import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin'

import {
  editorContent,
  entity,
  optionalSerializedChild,
  OptionalChild,
  entityType,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

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
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Exercise}
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
        <ToolbarMain showSubscriptionOptions {...props.state} />
      )}
    </article>
  )
}
