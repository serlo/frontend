import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

import { ImageGrid } from './components/image-grid'
import { GridImage } from './types'
import { loadGalleryImages } from './utils/helpers'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const imagesFromState = state.images as EditorImageDocument[]
  const imageSources = imagesFromState.map(({ state }) => state.src as string)

  const [images, setImages] = useState<GridImage[]>([])

  useEffect(() => {
    const loadImages = async () => {
      setImages(await loadGalleryImages(imageSources))
    }

    void loadImages()
  }, [imageSources])

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
