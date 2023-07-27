import { child, EditorPlugin, EditorPluginProps } from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const importantState = child({ plugin: EditorPluginType.Text })
export type ImportantPluginState = typeof importantState
export type ImportantProps = EditorPluginProps<ImportantPluginState>

export const importantPlugin: EditorPlugin<ImportantPluginState> = {
  Component: ImportantRenderer,
  config: {},
  state: importantState,
}

function ImportantRenderer(props: ImportantProps) {
  return (
    <div className="border-l-[5px] border-[#bedfed] pl-4">
      {props.state.render()}
    </div>
  )
}
