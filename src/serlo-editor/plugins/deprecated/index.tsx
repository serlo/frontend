import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { triggerSentry } from '@/helper/trigger-sentry'
import {
  EditorPlugin,
  EditorPluginProps,
  object,
  scalar,
  string,
} from '@/serlo-editor/plugin'

const deprecatedState = object({
  plugin: string(),
  state: scalar<unknown>({}),
})

export type DeprecatedPluginState = typeof deprecatedState

const DeprecatedRenderer: React.FunctionComponent<
  EditorPluginProps<DeprecatedPluginState>
> = (props) => {
  const editorStrings = useEditorStrings()

  triggerSentry({ message: 'editor: using "deprecatedPlugin"' })

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        {editorStrings.plugins.deprecated.unsupported}
      </div>
      <div className="panel-body">
        <pre>
          {JSON.stringify(
            {
              plugin: props.state.plugin.value,
              state: props.state.state.value,
            },
            undefined,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

export const deprecatedPlugin: EditorPlugin<typeof deprecatedState> = {
  Component: DeprecatedRenderer,
  state: deprecatedState,
  config: {},
}
