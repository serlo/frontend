import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'
import { Descendant } from 'slate'

import { DragAndDropOverlay } from './drag-and-drop-overlay'
import { ImageGrid } from './image-grid'
import { ImageGridSkeleton } from './image-grid-skeleton'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { createGalleryImage } from '../utils/helpers'

interface EditorImageGridProps {
  state: ImageGalleryProps['state']
  onImageClick: (index: number) => void
  onRemoveImageButtonClick: (index: number) => void
}

export function EditorImageGrid({
  state,
  onImageClick,
  onRemoveImageButtonClick,
}: EditorImageGridProps) {
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
      caption: caption?.state?.[0] as Descendant,
    })
  )

  useEffect(() => {
    const createGalleryImages = async () => {
      const result = await Promise.all(imagesData.map(createGalleryImage))
      setImages(result)
      setIsLoading(false)
    }

    setIsLoading(true)
    void createGalleryImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imagesData)])

  function handleDrop(dragIndex: number, hoverIndex: number) {
    state.images.move(
      dragIndex,
      state.images.length === hoverIndex ? hoverIndex - 1 : hoverIndex
    )
  }

  if (isLoading) return <ImageGridSkeleton />

  return (
    <ImageGrid
      images={images}
      extraChildren={imagesData.map((_, index) => {
        return (
          <DragAndDropOverlay
            key={index}
            onDrop={handleDrop}
            onClick={() => onImageClick(index)}
            index={index}
            isLast={index + 1 === images.length}
            id={index.toString()}
          />
        )
      })}
      onImageClick={onImageClick}
      onRemoveImageButtonClick={onRemoveImageButtonClick}
    />
  )
}
