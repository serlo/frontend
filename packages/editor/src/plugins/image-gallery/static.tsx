import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'
import { Descendant } from 'slate'

import { ImageGrid } from './components/image-grid'
import { GridImage } from './types'

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

  const [images, setImages] = useState<GridImage[]>([])

  useEffect(() => {
    setImages(
      imagesData.map((image) => ({
        src: image.src,
        width: image.dimensions.width,
        height: image.dimensions.height,
        caption: image.caption,
      }))
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imagesData)])

  function handleImageClick(index: number) {
    console.log('Clicked image at index:', index)
    // TODO: Lightbox feature will be implemented, linear issue PE-57
  }

  return (
    <div className="p-4">
      <ImageGrid images={images} onImageClick={handleImageClick} />
    </div>
  )
}
