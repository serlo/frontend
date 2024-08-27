import React, { useEffect, useState, useCallback, Suspense } from 'react'

import { ImageGrid } from './image-grid'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { getImageSrcFromState, loadGalleryPhotos } from '../utils/helpers'

interface EditorImageGridProps extends ImageGalleryProps {
  onClickImage: (id: string) => void
}

export function EditorImageGrid(props: EditorImageGridProps) {
  const { state, onClickImage } = props

  const [photos, setPhotos] = useState<GridImage[]>([])

  useEffect(() => {
    const images = state.images.map((id) => ({
      id: id.get(),
      src: getImageSrcFromState(id.get()),
    }))

    const initialOrderedIds = state.orderedIds.get()
      ? state.orderedIds.get().split(',')
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

  const handleMovePhoto = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setPhotos((prevPhotos) => {
        const updatedPhotos = [...prevPhotos]
        const [movedPhoto] = updatedPhotos.splice(dragIndex, 1)
        updatedPhotos.splice(hoverIndex, 0, movedPhoto)
        state.orderedIds.set(
          updatedPhotos
            .map((photo) => photo.id)
            .join(',')
            .toString()
        )
        return updatedPhotos
      })
    },
    [state.orderedIds]
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImageGrid
        photos={photos}
        onClickImage={onClickImage}
        onMovePhoto={handleMovePhoto}
      />
    </Suspense>
  )
}
