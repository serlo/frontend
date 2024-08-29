import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { Descendant } from 'slate'

import { ImageGrid } from './components/image-grid'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const imageDocuments = state.images.map(
    (item) => item.imagePlugin
  ) as EditorImageDocument[]
  const filteredImageDocuments = imageDocuments.filter(isImageDocument)
  const imagesData = filteredImageDocuments.map(
    ({ state: { src, caption } }, index) => ({
      src: src as string,
      dimensions: state.images[index].dimensions,
      // @ts-expect-error - Get caption text
      caption: caption?.state?.[0] as Descendant,
    })
  )

  function handleImageClick(index: number) {
    console.log('Clicked image at index:', index)
    // TODO: Lightbox feature will be implemented, linear issue PE-57
  }

  const isLoading = imagesData.some((image) => image.dimensions.width === 0)

  if (isLoading) return <>…</>

  const images = imagesData.map((image) => ({
    src: image.src,
    width: image.dimensions.width,
    height: image.dimensions.height,
    caption: image.caption,
  }))

  return (
    <div className="p-4">
      <ImageGrid images={images} onImageClick={handleImageClick} />
    </div>
  )
}
