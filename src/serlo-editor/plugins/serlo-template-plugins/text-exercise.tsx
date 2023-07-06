import {
  editorContent,
  entity,
  optionalSerializedChild,
  OptionalChild,
  entityType,
} from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent('exercise'),
  },
  {
    'text-solution': optionalSerializedChild('type-text-solution'),
  }
)

type TextExerciseTypePluginState = typeof textExerciseTypeState

export const textExerciseTypePlugin: EditorPlugin<
  TextExerciseTypePluginState,
  { skipControls: boolean }
> = {
  Component: TextExerciseTypeEditor,
  state: textExerciseTypeState,
  config: { skipControls: false },
}

function TextExerciseTypeEditor({
  state,
  config,
  renderIntoToolbar,
}: EditorPluginProps<TextExerciseTypePluginState, { skipControls: boolean }>) {
  const { content, 'text-solution': textSolution } = state
  const textExStrings = useEditorStrings().templatePlugins.textExercise

  return (
    <article className="text-exercise mt-12">
      {content.render()}
      {textSolution.id ? (
        <OptionalChild
          state={textSolution}
          removeLabel={textExStrings.removeSolution}
          onRemove={() => {
            textSolution.remove()
          }}
        />
      ) : (
        <AddButton onClick={() => textSolution.create()}>
          {textExStrings.createSolution}
        </AddButton>
      )}
      {config.skipControls ? null : (
        <ToolbarMain showSubscriptionOptions {...state} />
      )}
      {renderIntoToolbar(
        <ContentLoaders
          id={state.id.value}
          currentRevision={state.revision.value}
          onSwitchRevision={state.replaceOwnState}
          entityType={UuidType.Exercise}
        />
      )}
    </article>
  )
}
