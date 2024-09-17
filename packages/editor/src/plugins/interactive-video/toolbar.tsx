import { PluginToolbar, PreviewButton } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { type Dispatch, type SetStateAction } from 'react'

import type { InteractiveVideoProps } from '.'

export const InteractiveVideoToolbar = ({
  id,
  previewActive,
  setPreviewActive,
}: InteractiveVideoProps & {
  previewActive: boolean
  setPreviewActive: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <PluginToolbar
      pluginType={EditorPluginType.InteractiveVideo}
      pluginSettings={
        <PreviewButton
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
