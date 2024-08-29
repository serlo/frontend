import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'
import { Descendant } from 'slate'

import { DragAndDropOverlay } from './drag-and-drop-overlay'
import { ImageGrid } from './image-grid'
import type { ImageGalleryProps } from '..'
import { GridImage } from '../types'
import { getDimensions } from '../utils/helpers'

interface EditorImageGridProps {
  state: ImageGalleryProps['state']
  onImageClick: (index: number) => void
  onRemoveImageButtonClick: (index: number) => void
}

const fallbackSrc =
  'https://assets.serlo.org/e4dccca0-65bb-11ef-9c32-0d3a496f07ec/image.jpg'

export function EditorImageGrid({
  state,
  onImageClick,
  onRemoveImageButtonClick,
}: EditorImageGridProps) {
  const [images, setImages] = useState<GridImage[]>([])

  const imageIds = state.images.map(({ imagePlugin }) => imagePlugin.get())
  const imageDocuments = useAppSelector((state) =>
    selectStaticDocuments(state, imageIds)
  )
  const filteredImageDocuments = imageDocuments.filter(isImageDocument)
  const imagesData = filteredImageDocuments.map(
    ({ state: { src, caption } }, index) => ({
      src: src as string,
      dimensions: state.images[index].dimensions,
      // @ts-expect-error - Get caption text
      caption: caption?.state?.[0] as Descendant,
    })
  )

  useEffect(() => {
    const setDimensions = async (src: string, index: number) => {
      const dimensions = await getDimensions(src)
      state.images[index].dimensions.width.set(dimensions.width)
      state.images[index].dimensions.height.set(dimensions.height)
    }

    imagesData.forEach((image, index) => {
      if (!image.src || image.dimensions.width.value !== 0) return
      void setDimensions(image.src, index)
    })

    setImages(
      imagesData.map((image) => ({
        src: image.src,
        width: image.dimensions.width.value,
        height: image.dimensions.height.value,
        caption: image.caption,
      }))
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(imagesData)])

  function handleDrop(dragIndex: number, hoverIndex: number) {
    state.images.move(dragIndex, hoverIndex)
  }

  const imagesWithFallback = images.map((image) => {
    if (!image.src.length) {
      return {
        src: fallbackSrc,
        width: 300,
        height: 100,
        caption: image.caption,
      }
    }
    return image
  })

  return (
    <ImageGrid
      images={imagesWithFallback}
      extraChildren={imagesData.map((_, index) => {
        return (
          <DragAndDropOverlay
            key={index}
            onDrop={handleDrop}
            onClick={() => onImageClick(index)}
            index={index}
            id={index.toString()}
          />
        )
      })}
      onImageClick={onImageClick}
      onRemoveImageButtonClick={onRemoveImageButtonClick}
    />
  )
}
