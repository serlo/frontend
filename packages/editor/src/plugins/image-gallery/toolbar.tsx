import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@editor/utils/cn'

interface ImageGalleryToolbarProps {
  id: string
  onAddImagesButtonClick: () => void
}

export const ImageGalleryToolbar = (props: ImageGalleryToolbarProps) => {
  const { id, onAddImagesButtonClick } = props

  const imageGalleryStrings = useEditStrings().plugins.imageGallery

  const pluginSettings = (
    <button
      onClick={onAddImagesButtonClick}
      className={cn(
        'transition-al mr-2 rounded-md border border-gray-500 px-1 text-sm',
        'hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200'
      )}
    >
      {imageGalleryStrings.addImages} {' +'}
    </button>
  )

  return (
    <PluginToolbar
      pluginType={EditorPluginType.ImageGallery}
      pluginSettings={pluginSettings}
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
