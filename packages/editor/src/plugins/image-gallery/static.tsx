import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'
import { Node } from 'slate'

import { ImageGrid } from './components/image-grid'
import { GridImage } from './types'
import { createGalleryImage } from './utils/helpers'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const imagesFromState = state.images as EditorImageDocument[]
  const imagesData = imagesFromState.map(({ state: { src, caption } }) => ({
    src: src as string,
    // @ts-expect-error - Get caption text
    caption: caption?.state?.[0] ? Node.string(caption.state[0] as Node) : '',
  }))

  const [images, setImages] = useState<GridImage[]>([])

  useEffect(() => {
    const createGalleryImages = async () => {
      const result = await Promise.all(imagesData.map(createGalleryImage))
      setImages(result)
    }

    void createGalleryImages()
  }, [imagesData])

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
