import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

export const CanvasToolbar = ({ id }: { id: string | undefined }) => {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.Canvas}
      pluginSettings={<>{/* Custom toolbar buttons */}</>}
      pluginControls={
        <PluginDefaultTools pluginId={id || new Date().toString()} />
      }
    />
  )
}
