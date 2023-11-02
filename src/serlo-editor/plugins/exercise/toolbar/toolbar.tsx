import type { ExerciseProps } from '..'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const ExerciseToolbar = ({ id }: ExerciseProps) => {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.Exercise}
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="mt-2.5"
    />
  )
}
