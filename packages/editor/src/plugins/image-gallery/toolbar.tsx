import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import type { ImageGalleryProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

export const ImageGalleryToolbar = (props: ImageGalleryProps) => {
  const { id } = props

  const onClickAddImage = () => {
    console.log('Add Image')
  }

  return (
    <PluginToolbar
      pluginType={EditorPluginType.ImageGallery}
      // pluginTooltipText={editorStrings.plugins.image.helpTooltipText}
      pluginControls={<PluginDefaultTools pluginId={id} />}
      pluginSettings={<>{renderSettingsModal()}</>}
    />
  )
  function renderSettingsModal() {
    return (
      <>
        <button
          onClick={() => onClickAddImage()}
          className={cn(`
            mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all
            hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200
          `)}
        >
          Add Image <FaIcon icon={faPlusCircle} />
        </button>
      </>
    )
  }
}
