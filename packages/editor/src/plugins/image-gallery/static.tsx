import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { MouseEvent, useEffect, useState } from 'react'

import { ImageGrid } from './components/image-grid'
import { GridImage } from './types'
import { loadGalleryPhotos } from './utils/helpers'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const imagesFromState = state.images as EditorImageDocument[]
  const images = imagesFromState.map(({ state }) => state.src as string)

  const [photos, setPhotos] = useState<GridImage[]>([])

  useEffect(() => {
    const loadPhotos = async () => {
      setPhotos(await loadGalleryPhotos(images))
    }

    void loadPhotos()
  }, [images])

  function handleImageMouseDown(event: MouseEvent, index: number) {
    console.log('Clicked image at index:', index)
    // Lightbox feature will be implemented, linear issue PE-57
  }

  return (
    <div className="p-4">
      <ImageGrid photos={photos} onImageMouseDown={handleImageMouseDown} />
    </div>
  )
}
