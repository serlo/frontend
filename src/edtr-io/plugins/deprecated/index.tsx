import {
  EditorPlugin,
  EditorPluginProps,
  object,
  scalar,
  string,
} from '@edtr-io/plugin'
import * as React from 'react'

import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const deprecatedState = object({
  plugin: string(),
  state: scalar<unknown>({}),
})

export type DeprecatedPluginState = typeof deprecatedState

export const DeprecatedRenderer: React.FunctionComponent<
  EditorPluginProps<DeprecatedPluginState>
> = (props) => {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        {editorStrings.deprecated.unsupported}
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
