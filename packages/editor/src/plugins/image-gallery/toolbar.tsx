import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

interface ImageGalleryToolbarProps {
  id: string
  showAddImagesButton: boolean
  onAddImagesButtonClick: () => void
}

export const ImageGalleryToolbar = (props: ImageGalleryToolbarProps) => {
  const { id, showAddImagesButton, onAddImagesButtonClick } = props

  const imageGalleryStrings = useEditorStrings().plugins.imageGallery

  const pluginSettings = showAddImagesButton ? (
    <button
      onClick={onAddImagesButtonClick}
      className={cn(
        'transition-al mr-2 rounded-md border border-gray-500 px-1 text-sm',
        'hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200'
      )}
    >
      {imageGalleryStrings.addImages} {' +'}
    </button>
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.ImageGallery}
      pluginSettings={pluginSettings}
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
