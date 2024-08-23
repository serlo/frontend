import { useEffect, useState } from 'react'
import { Photo, RowsPhotoAlbum } from 'react-photo-album'

import type { ImageGalleryProps } from '..'
import { getImageSrcFromState, loadGalleryPhotos } from '../utils/helpers'

// eslint-disable-next-line import/no-unassigned-import
import 'react-photo-album/rows.css'

interface ImageGridProps extends ImageGalleryProps {
  onClickImage: (index: number) => void
}

export function ImageGrid(props: ImageGridProps) {
  const { state, onClickImage } = props

  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const images = state.images.map((id) => ({
      id: id.get(),
      src: getImageSrcFromState(id.get()),
    }))

    const initialOrderedIds = state.orderedIds.get()
      ? (JSON.parse(state.orderedIds.get()) as string[])
      : []

    const loadPhotosAsync = async () => {
      try {
        const sortedPhotos = await loadGalleryPhotos(images, initialOrderedIds)
        setPhotos(sortedPhotos)
      } catch (error) {
        console.error('Failed to load photos:', error)
      }
    }

    void loadPhotosAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RowsPhotoAlbum
      spacing={16}
      padding={0}
      photos={photos}
      rowConstraints={{ maxPhotos: 2 }}
      targetRowHeight={200}
      onClick={({ index }) => {
        onClickImage(index)
      }}
    />
  )
}
