import { editorContent, entity, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { UuidType } from '@/data-types'
import { EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'

export const textSolutionTypeState = entityType(
  {
    ...entity,
    content: editorContent('solution'),
  },
  {}
)

type TextSolutionTypeState = typeof textSolutionTypeState

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
    <div className="mt-12">
      {props.state.content.render()}

      {props.config.skipControls ? null : (
        <ToolbarMain showSubscriptionOptions {...props.state} />
      )}
      {props.renderIntoSideToolbar(
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Solution}
        />
      )}
    </div>
  )
}
