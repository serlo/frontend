import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'
import { Node } from 'slate'

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
  const imagesData = filteredImageDocuments.map(
    ({ state: { src, caption } }) => ({
      src: src as string,
      // @ts-expect-error - Get caption text
      caption: caption?.state?.[0] ? Node.string(caption.state[0] as Node) : '',
    })
  )

  useEffect(() => {
    const loadImagesAsync = async () => {
      const loadedImages = await loadGalleryImages(imagesData)
      setImages(loadedImages)
      setIsLoading(false)
    }

    setIsLoading(true)
    void loadImagesAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imagesData)])

  if (isLoading) return <ImageGridSkeleton />

  return <ImageGrid images={images} onImageClick={onImageClick} />
}
