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
import {
  type EditorPlugin,
  type EditorPluginProps,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const textExerciseTypeState = entityType(
  {
    ...entity,
    content: editorContent(EditorPluginType.Exercise),
  },
  {
    'text-solution': optionalSerializedChild('type-text-solution'),
  }
)

export type TextExerciseTypePluginState = typeof textExerciseTypeState

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
}: EditorPluginProps<TextExerciseTypePluginState, { skipControls: boolean }>) {
  const { content, 'text-solution': textSolution } = state
  const textExStrings = useEditorStrings().templatePlugins.textExercise

  return (
    <>
      <div className="absolute right-0 -mt-20 mr-side">
        <ContentLoaders
          id={state.id.value}
          currentRevision={state.revision.value}
          onSwitchRevision={state.replaceOwnState}
          entityType={UuidType.Exercise}
        />
      </div>
      <article className="text-exercise mt-32">
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
      </article>
    </>
  )
}
