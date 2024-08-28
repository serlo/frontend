import { Fragment, MouseEvent } from 'react'

import { GridImage } from '../types'
import { getRowPercentages } from '../utils/helpers'

interface ImageGridProps {
  images: GridImage[]
  onImageMouseDown: (event: MouseEvent<HTMLDivElement>, index: number) => void
}

export function ImageGrid(props: ImageGridProps) {
  const { images, onImageMouseDown } = props

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => {
        if (index % 2 !== 0) return null

        // If the image is the last one in the array, render it as a single image
        if (index + 1 === images.length) {
          return (
            <div
              key={image.src}
              className="mx-auto"
              onMouseDown={(event) => onImageMouseDown(event, index)}
            >
              <img
                src={image.src}
                alt={`Image ${image.src}`}
                className="max-h-96"
              />
            </div>
          )
        }

        const rowPercentages = getRowPercentages(image, images[index + 1])

        return (
          <Fragment key={image.src}>
            <div
              style={{ width: `calc(${rowPercentages.left}% - 0.5rem)` }}
              onMouseDown={(event) => onImageMouseDown(event, index)}
            >
              <img src={image.src} alt={`Image ${image.src}`} />
            </div>
            <div
              style={{ width: `calc(${rowPercentages.right}% - 0.5rem)` }}
              onMouseDown={(event) => onImageMouseDown(event, index + 1)}
            >
              <img
                src={images[index + 1].src}
                alt={`Image ${images[index + 1].src}`}
              />
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
