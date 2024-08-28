import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { MouseEvent, useEffect, useState } from 'react'

import { ImageGrid } from './image-grid'
import { ImageGridSkeleton } from './image-grid-skeleton'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { loadGalleryPhotos } from '../utils/helpers'

interface EditorImageGridProps {
  state: ImageGalleryProps['state']
  onImageMouseDown: (event: MouseEvent<HTMLDivElement>, index: number) => void
}

export function EditorImageGrid(props: EditorImageGridProps) {
  const { state, onImageMouseDown } = props

  const [photos, setPhotos] = useState<GridImage[]>([])

  const imageIds = state.images.map((id) => id.get())
  const imageDocuments = useAppSelector((state) =>
    selectStaticDocuments(state, imageIds)
  )
  const filteredImageDocuments = imageDocuments.filter(isImageDocument)
  const imageUrls = filteredImageDocuments.map(
    (imageDocument) => imageDocument.state.src as string
  )

  useEffect(() => {
    const loadPhotosAsync = async () => {
      setPhotos(await loadGalleryPhotos(imageUrls))
    }

    void loadPhotosAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imageUrls)])

  if (photos.length === 0) return <ImageGridSkeleton />

  return <ImageGrid photos={photos} onImageMouseDown={onImageMouseDown} />
}
