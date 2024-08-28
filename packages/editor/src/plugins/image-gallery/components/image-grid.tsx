import { Fragment } from 'react'

import { GridImage } from '../types'
import { getRowPercentages } from '../utils/helpers'

interface ImageGridProps {
  images: GridImage[]
  onImageClick: (index: number) => void
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => {
        if (index % 2 !== 0) return null

        // If the image is the last one in the array, render it as a single image
        if (index + 1 === images.length) {
          return (
            <button
              key={image.src}
              className="mx-auto"
              onMouseDown={() => onImageClick(index)}
            >
              <img
                src={image.src}
                alt={`Image ${image.src}`}
                className="max-h-96"
              />
            </button>
          )
        }

        const rowPercentages = getRowPercentages(image, images[index + 1])

        return (
          <Fragment key={image.src}>
            <button
              style={{ width: `calc(${rowPercentages.left}% - 0.5rem)` }}
              onClick={() => onImageClick(index)}
            >
              <img src={image.src} alt={`Image ${image.src}`} />
            </button>
            <button
              style={{ width: `calc(${rowPercentages.right}% - 0.5rem)` }}
              onClick={() => onImageClick(index + 1)}
            >
              <img
                src={images[index + 1].src}
                alt={`Image ${images[index + 1].src}`}
              />
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
