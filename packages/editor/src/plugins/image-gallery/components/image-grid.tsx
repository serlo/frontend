import React from 'react'

import { GridImage } from '../types'

interface ImageGridProps {
  photos: GridImage[]
  onClickImage: (index: number) => void
}

const calculateDimensions = (photo1: GridImage, photo2: GridImage) => {
  const commonHeight = Math.min(photo1.height, photo2.height)
  const width1 = (photo1.width / photo1.height) * commonHeight
  const width2 = (photo2.width / photo2.height) * commonHeight

  return [width1, width2]
}

export function ImageGrid(props: ImageGridProps) {
  const { photos, onClickImage } = props

  return (
    <div className="flex-gap-1 flex flex-wrap">
      {photos.map((photo, index) => {
        if (index % 2 === 0) {
          // If the photo is the last one in the array, render it as a single image
          if (index + 1 === photos.length) {
            return (
              <div
                key={photo.id}
                className="flex-grow p-1"
                onClick={() => onClickImage(index)}
              >
                <img
                  src={photo.src}
                  alt={`Image ${photo.id}`}
                  className="h-full w-full object-cover"
                />
              </div>
            )
          }
          const [width1, width2] = calculateDimensions(photo, photos[index + 1])

          // Calculate the percentage widths based on the calculated dimensions
          const width1Percentage = (width1 / (width1 + width2)) * 100
          const width2Percentage = (width2 / (width1 + width2)) * 100

          return (
            <React.Fragment key={photo.id}>
              <div
                className="flex-grow p-1"
                style={{ width: `${width1Percentage}%` }}
                onClick={() => onClickImage(index)}
              >
                <img
                  src={photo.src}
                  alt={`Image ${photo.id}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="flex-grow p-1"
                style={{ width: `${width2Percentage}%` }}
                onClick={() => onClickImage(index + 1)}
              >
                <img
                  src={photos[index + 1].src}
                  alt={`Image ${photos[index + 1].id}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </React.Fragment>
          )
        }
        return null
      })}
    </div>
  )
}
