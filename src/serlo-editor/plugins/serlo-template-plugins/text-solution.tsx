import { editorContent, entity, entityType } from './common/common'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'

export const textSolutionTypeState = entityType(
  {
    ...entity,
    content: editorContent('solution'),
  },
  {}
)

export type TextSolutionTypeState = typeof textSolutionTypeState

export type TextSolutionTypeProps = EditorPluginProps<
  TextSolutionTypeState,
  { skipControls: boolean }
>

export const textSolutionTypePlugin: EditorPlugin<
  TextSolutionTypeState,
  { skipControls: boolean }
> = {
  Component: TextSolutionTypeEditor,
  state: textSolutionTypeState,
  config: { skipControls: false },
}

function TextSolutionTypeEditor(props: TextSolutionTypeProps) {
  return (
    <>
      {props.state.content.render()}

      {props.config.skipControls ? null : (
        <ToolbarMain showSubscriptionOptions {...props.state} />
      )}
    </>
  )
}
