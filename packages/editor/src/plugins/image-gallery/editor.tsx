import type { ImageGalleryProps } from '.'
import { ImageGalleryEditorInner } from './components/editor-inner'
import { ImageGalleryPluginProvider } from './contexts/provider'

export function ImageGalleryEditor(props: ImageGalleryProps) {
  return (
    <ImageGalleryPluginProvider>
      <ImageGalleryEditorInner {...props} />
    </ImageGalleryPluginProvider>
  )
}
