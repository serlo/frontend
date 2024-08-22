import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { ImageGalleryProps } from '.'

export const ImageGalleryToolbar = (props: ImageGalleryProps) => {
  const { id } = props

  return (
    <PluginToolbar
      pluginType={EditorPluginType.ImageGallery}
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
