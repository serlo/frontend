import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  EditorPlugin,
  EditorPluginProps,
  object,
  scalar,
  string,
} from '@/serlo-editor/plugin'

export const errorState = object({
  plugin: string(),
  state: scalar<unknown>({}),
})

export type ErrorPluginState = typeof errorState

export const ErrorRenderer: React.FunctionComponent<
  EditorPluginProps<ErrorPluginState>
> = (props) => {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">{editorStrings.error.convertionError}</div>
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

export const errorPlugin: EditorPlugin<typeof errorState> = {
  Component: ErrorRenderer,
  state: errorState,
  config: {},
}
