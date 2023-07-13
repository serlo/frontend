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
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.Exercise),
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
    <article className="text-exercise mt-16">
      {content.render()}
      {textSolution.id ? (
        <OptionalChild
          state={textSolution}
          removeLabel={textExStrings.removeSolution}
          onRemove={() => textSolution.remove()}
        />
      ) : (
        <div className="-ml-1.5 max-w-[50%]">
          <AddButton onClick={() => textSolution.create()}>
            {textExStrings.createSolution}
          </AddButton>
        </div>
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
