import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect } from 'react'
import { Descendant } from 'slate'

import { DragAndDropOverlay } from './drag-and-drop-overlay'
import { ImageGrid } from './image-grid'
import { ImageGridSkeleton } from './image-grid-skeleton'
import type { ImageGalleryProps } from '..'
import { getDimensions } from '../utils/helpers'

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
  const imageIds = state.images.map(({ imagePlugin }) => imagePlugin.get())
  const imageDocuments = useAppSelector((state) =>
    selectStaticDocuments(state, imageIds)
  )
  const filteredImageDocuments = imageDocuments.filter(isImageDocument)
  const images = filteredImageDocuments.map(
    ({ state: { src, caption } }, index) => ({
      src: src as string,
      dimensions: {
        width: state.images[index].dimensions.width.value,
        height: state.images[index].dimensions.height.value,
      },
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

    images.forEach((image, index) => {
      if (!image.src || image.dimensions.width !== 0) return
      void setDimensions(image.src, index)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(images)])

  function handleDrop(dragIndex: number, hoverIndex: number) {
    state.images.move(dragIndex, hoverIndex)
  }

  const isLoading = images.some((image) => image.dimensions.width === 0)

  if (isLoading) return <ImageGridSkeleton />

  return (
    <>
      <ImageGrid
        images={images}
        extraChildren={images.map((_, index) => {
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
    </>
  )
}
