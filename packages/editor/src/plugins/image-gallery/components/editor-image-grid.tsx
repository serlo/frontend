import { isEmptyTextDocument } from '@editor/plugins/text/utils/static-is-empty'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { selectStaticDocuments, useAppSelector } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useEffect, useState } from 'react'

import { DragAndDropOverlay } from './drag-and-drop-overlay'
import { ImageGrid } from './image-grid'
import { ImageGridSkeleton } from './image-grid-skeleton'
import { RemoveImageButton } from './remove-image-button'
import type { ImageGalleryProps } from '..'
import { getDimensions } from '../utils/helpers'
import { cn } from '@/helper/cn'

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
  const imageIds = state.images.map(({ imagePlugin }) => imagePlugin.id)
  const staticImageDocuments = useAppSelector((state) =>
    selectStaticDocuments(state, imageIds)
  ).filter(isImageDocument)

  const images = staticImageDocuments.map(
    ({ state: { src, caption, alt } }, index) => {
      const hasVisibleCaption = caption && !isEmptyTextDocument(caption)

      return {
        src: String(src),
        alt: alt ?? '',
        dimensions: {
          width: state.images[index].dimensions.width.value,
          height: state.images[index].dimensions.height.value,
        },
        caption: hasVisibleCaption ? (
          <StaticRenderer document={caption} />
        ) : null,
      }
    }
  )

  const [isLoading, setIsLoading] = useState(true)

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
    // this is stupid, but it should only run when a src changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(images.map(({ src }) => src))])

  useEffect(() => {
    if (images.some((image) => image.dimensions.width === 0)) return
    // leave some time for images to render
    setTimeout(() => setIsLoading(false), 1000)
  }, [images])

  function handleDrop(dragIndex: number, hoverIndex: number) {
    if (dragIndex === hoverIndex) return
    const targetIndex =
      state.images.length === hoverIndex ? hoverIndex - 1 : hoverIndex
    state.images.move(dragIndex, targetIndex)
  }

  return (
    <>
      <ImageGridSkeleton className={isLoading ? 'block' : 'hidden'} />
      <div
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      >
        <ImageGrid
          images={images}
          extraChildren={images.map((_, index) => {
            return (
              <DragAndDropOverlay
                key={index}
                onDrop={handleDrop}
                onClick={() => onImageClick(index)}
                index={index}
                isLast={index === images.length - 1}
              />
            )
          })}
          onImageClick={onImageClick}
          renderRemoveImageButton={renderRemoveImageButton}
        />
      </div>
    </>
  )

  function renderRemoveImageButton(index: number) {
    return <RemoveImageButton onClick={() => onRemoveImageButtonClick(index)} />
  }
}
