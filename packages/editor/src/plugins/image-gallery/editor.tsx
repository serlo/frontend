import type { ImageGalleryProps } from '.'
import { AddImages } from './components/add-images'
import { ImageGalleryToolbar } from './toolbar'

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { focused } = props

  return (
    <div
      className="group/image-gallery mx-auto"
      data-qa="plugin-image-gallery-wrapper"
    >
      {focused ? <ImageGalleryToolbar {...props} /> : null}
      <AddImages />
    </div>
  )
}
