import { Fragment } from 'react'

import { GridImage } from '../types'
import { getRowPercentages } from '../utils/helpers'
import { cn } from '@/helper/cn'

const wrapperClassNames = 'group relative'
const hoverOverlayClassNames = cn(
  'absolute inset-0 flex items-end justify-center p-3 italic text-white',
  'bg-gradient-to-b opacity-0 transition-all duration-100 group-hover:opacity-100',
  'bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.15)] via-70% to-[rgba(0,0,0,0.8)] to-85%'
)

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
              className={cn(wrapperClassNames, 'mx-auto')}
              onMouseDown={() => onImageClick(index)}
            >
              <img
                src={image.src}
                alt={`Image ${image.src}`}
                className="max-h-96"
              />
              <div className={hoverOverlayClassNames}>{image.caption}</div>
            </button>
          )
        }

        const [leftImage, rightImage] = [image, images[index + 1]]
        const rowPercentages = getRowPercentages(leftImage, rightImage)

        return (
          <Fragment key={leftImage.src}>
            <button
              className={wrapperClassNames}
              style={{ width: `calc(${rowPercentages.left}% - 0.5rem)` }}
              onClick={() => onImageClick(index)}
            >
              <img src={leftImage.src} alt={`leftImage ${leftImage.src}`} />
              <div className={hoverOverlayClassNames}>{leftImage.caption}</div>
            </button>
            <button
              className={wrapperClassNames}
              style={{ width: `calc(${rowPercentages.right}% - 0.5rem)` }}
              onClick={() => onImageClick(index + 1)}
            >
              <img src={rightImage.src} alt={`Image ${rightImage.src}`} />
              <div className={hoverOverlayClassNames}>{rightImage.caption}</div>
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
