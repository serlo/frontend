import { DndWrapper } from '@editor/core/components/dnd-wrapper'
import React from 'react'

import { DraggableImage } from './draggable-image'
import { GridImage } from '../types'

interface ImageGridProps {
  photos: GridImage[]
  onClickImage: (index: string) => void
  onMovePhoto?: (dragIndex: number, hoverIndex: number) => void
}

const calculateDimensions = (photo1: GridImage, photo2: GridImage) => {
  const commonHeight = Math.min(photo1.height, photo2.height)
  const width1 = (photo1.width / photo1.height) * commonHeight
  const width2 = (photo2.width / photo2.height) * commonHeight

  return [width1, width2]
}

export function ImageGrid({
  photos,
  onClickImage,
  onMovePhoto,
}: ImageGridProps) {
  return (
    <DndWrapper>
      <div className="flex-gap-1 flex flex-wrap">
        {photos.map((photo, index) => {
          if (index % 2 === 0) {
            // If the photo is the last one in the array, render it as a single image
            if (index + 1 === photos.length) {
              return (
                <DraggableImage
                  key={photo.id}
                  id={photo.id}
                  index={index}
                  onMovePhoto={onMovePhoto}
                  className="flex-grow p-1"
                  onClick={() => onClickImage(photo.id)}
                >
                  <img
                    src={photo.src}
                    alt={`Image ${photo.id}`}
                    className="h-full w-full object-cover"
                  />
                </DraggableImage>
              )
            }

            const [width1, width2] = calculateDimensions(
              photo,
              photos[index + 1]
            )
            const width1Percentage = (width1 / (width1 + width2)) * 100
            const width2Percentage = (width2 / (width1 + width2)) * 100

            return (
              <React.Fragment key={photo.id}>
                <DraggableImage
                  id={photo.id}
                  index={index}
                  onMovePhoto={onMovePhoto}
                  className="flex-grow p-1"
                  style={{ width: `${width1Percentage}%` }}
                  onClick={() => onClickImage(photo.id)}
                >
                  <img
                    src={photo.src}
                    alt={`Image ${photo.id}`}
                    className="h-full w-full object-cover"
                  />
                </DraggableImage>
                <DraggableImage
                  id={photos[index + 1].id}
                  index={index + 1}
                  onMovePhoto={onMovePhoto}
                  className="flex-grow p-1"
                  style={{ width: `${width2Percentage}%` }}
                  onClick={() => onClickImage(photos[index + 1].id)}
                >
                  <img
                    src={photos[index + 1].src}
                    alt={`Image ${photos[index + 1].id}`}
                    className="h-full w-full object-cover"
                  />
                </DraggableImage>
              </React.Fragment>
            )
          }
          return null
        })}
      </div>
    </DndWrapper>
  )
}
