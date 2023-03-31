import { EditorPlugin, EditorPluginProps, scalar } from 'test-edtr-io/plugin'

const separatorState = scalar(undefined)

export type SeparatorPluginState = typeof separatorState
export type SeparatorProps = EditorPluginProps<SeparatorPluginState>

export const separatorPlugin: EditorPlugin<SeparatorPluginState> = {
  Component: SeparatorEditor,
  state: separatorState,
  config: {},
}

function SeparatorEditor(props: SeparatorProps) {
  if (!props.editable) return null
  return (
    <div className="py-2.5">
      <hr className="my-0" />
    </div>
  )
}
