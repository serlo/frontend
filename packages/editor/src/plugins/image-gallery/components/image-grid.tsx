import React, { MouseEvent } from 'react'

import { GridImage } from '../types'
import { getRowPercentages } from '../utils/helpers'

interface ImageGridProps {
  photos: GridImage[]
  onImageMouseDown: (event: MouseEvent<HTMLDivElement>, index: number) => void
}

export function ImageGrid(props: ImageGridProps) {
  const { photos, onImageMouseDown } = props

  return (
    <div className="flex flex-wrap gap-4">
      {photos.map((photo, index) => {
        if (index % 2 !== 0) return null

        // If the photo is the last one in the array, render it as a single image
        if (index + 1 === photos.length) {
          return (
            <div
              key={photo.src}
              className="flex-grow"
              onMouseDown={(event) => onImageMouseDown(event, index)}
            >
              <img
                src={photo.src}
                alt={`Image ${photo.src}`}
                className="h-full w-full object-cover"
              />
            </div>
          )
        }

        const rowPercentages = getRowPercentages(photo, photos[index + 1])

        return (
          <React.Fragment key={photo.src}>
            <div
              style={{ width: `calc(${rowPercentages.left}% - 0.5rem)` }}
              onMouseDown={(event) => onImageMouseDown(event, index)}
            >
              <img
                src={photo.src}
                alt={`Image ${photo.src}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              style={{ width: `calc(${rowPercentages.right}% - 0.5rem)` }}
              onMouseDown={(event) => onImageMouseDown(event, index + 1)}
            >
              <img
                src={photos[index + 1].src}
                alt={`Image ${photos[index + 1].src}`}
                className="h-full w-full object-cover"
              />
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
