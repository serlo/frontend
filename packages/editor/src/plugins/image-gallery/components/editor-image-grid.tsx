import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'

import { ImageGrid } from './image-grid'
import { ImageGridSkeleton } from './image-grid-skeleton'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { loadGalleryImages } from '../utils/helpers'

interface EditorImageGridProps {
  state: ImageGalleryProps['state']
  onImageClick: (index: number) => void
}

export function EditorImageGrid({ state, onImageClick }: EditorImageGridProps) {
  const [images, setImages] = useState<GridImage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const imageIds = state.images.map((id) => id.get())
  const imageDocuments = useAppSelector((state) =>
    selectStaticDocuments(state, imageIds)
  )
  const filteredImageDocuments = imageDocuments.filter(isImageDocument)
  const imageUrls = filteredImageDocuments.map(
    (imageDocument) => imageDocument.state.src as string
  )

  useEffect(() => {
    const loadImagesAsync = async () => {
      const loadedImages = await loadGalleryImages(imageUrls)
      setImages(loadedImages)
      setIsLoading(false)
    }

    setIsLoading(true)
    void loadImagesAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imageUrls)])

  if (isLoading) return <ImageGridSkeleton />

  return <ImageGrid images={images} onImageClick={onImageClick} />
}
