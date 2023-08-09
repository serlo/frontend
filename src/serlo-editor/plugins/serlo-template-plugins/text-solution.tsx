import { editorContent, entity, entityType } from './common/common'
import { ContentLoaders } from './helpers/content-loaders/content-loaders'
import { ToolbarMain } from './toolbar-main/toolbar-main'
import { UuidType } from '@/data-types'
import {
  type EditorPlugin,
  type EditorPluginProps,
} from '@/serlo-editor/plugin'

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
      <div className="absolute right-0 -mt-10 mr-side">
        <ContentLoaders
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
          entityType={UuidType.Solution}
        />
      </div>
      <div className="mt-12">
        {props.state.content.render()}

        {props.config.skipControls ? null : (
          <ToolbarMain showSubscriptionOptions {...props.state} />
        )}
      </div>
    </>
  )
}
