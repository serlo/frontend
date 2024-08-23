import React, { useEffect, useState } from 'react'

import { ImageGrid } from './image-grid'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { getImageSrcFromState, loadGalleryPhotos } from '../utils/helpers'

interface EditorImageGridProps extends ImageGalleryProps {
  onClickImage: (index: number) => void
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

  return <ImageGrid photos={photos} onClickImage={onClickImage} />
}
