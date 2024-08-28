import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { MouseEvent, useEffect, useState } from 'react'

import { ImageGrid } from './image-grid'
import { ImageGridSkeleton } from './image-grid-skeleton'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { loadGalleryImages } from '../utils/helpers'

interface EditorImageGridProps {
  state: ImageGalleryProps['state']
  handleImageClick: (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => void
}

export function EditorImageGrid({
  state,
  handleImageClick,
}: EditorImageGridProps) {
  const [images, setImages] = useState<GridImage[]>([])

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
      setImages(await loadGalleryImages(imageUrls))
    }

    void loadImagesAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imageUrls)])

  if (images.length === 0) return <ImageGridSkeleton />

  return <ImageGrid images={images} handleImageClick={handleImageClick} />
}
