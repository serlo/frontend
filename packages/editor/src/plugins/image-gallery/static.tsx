import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'

import { ImageGrid } from './components/image-grid'
import { GridImage } from './types'
import { loadGalleryPhotos } from './utils/helpers'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const imagesFromState = state.images as EditorImageDocument[]
  const images = imagesFromState.map(({ id, state }) => ({
    id: id as string,
    src: state.src as string,
  }))

  const [photos, setPhotos] = useState<GridImage[]>([])

  useEffect(() => {
    const orderedIds = state.orderedIds
      ? (JSON.parse(state.orderedIds) as string[])
      : []

    const loadPhotos = async () => {
      try {
        const sortedPhotos = await loadGalleryPhotos(images, orderedIds)
        setPhotos(sortedPhotos)
      } catch (error) {
        console.error('Failed to load photos:', error)
      }
    }

    void loadPhotos()
  }, [images, state.orderedIds])

  const onClickImage = (index: number) => {
    console.log('Clicked image at index:', index)
    // TODO: Open lightbox
  }

  return (
    <div className="p-4">
      <ImageGrid photos={photos} onClickImage={onClickImage} />
    </div>
  )
}
