import { MouseEvent, useEffect, useState } from 'react'

import { ImageGrid } from './image-grid'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { getImageSrcFromState, loadGalleryPhotos } from '../utils/helpers'

interface EditorImageGridProps {
  state: ImageGalleryProps['state']
  onImageMouseDown: (event: MouseEvent<HTMLDivElement>, index: number) => void
}

export function EditorImageGrid(props: EditorImageGridProps) {
  const { state, onImageMouseDown } = props

  const [photos, setPhotos] = useState<GridImage[]>([])

  useEffect(() => {
    const images = state.images.map((id) => ({
      id: id.get(),
      src: getImageSrcFromState(id.get()),
    }))

    const loadPhotosAsync = async () => {
      try {
        const sortedPhotos = await loadGalleryPhotos(images)
        setPhotos(sortedPhotos)
      } catch (error) {
        console.error('Failed to load photos:', error)
      }
    }

    void loadPhotosAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <ImageGrid photos={photos} onImageMouseDown={onImageMouseDown} />
}
