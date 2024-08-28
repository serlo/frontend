import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { Fragment } from 'react'
import { Descendant } from 'slate'

import { GridImage } from '../types'
import { getRowPercentages } from '../utils/helpers'
import { cn } from '@/helper/cn'

const wrapperClassNames = 'group relative'
const hoverOverlayClassNames = cn(
  'pointer-events-none absolute inset-0 flex items-end justify-center p-3 italic text-white',
  'bg-gradient-to-b opacity-0 transition-all duration-100 group-hover:opacity-100',
  'bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.15)] via-70% to-[rgba(0,0,0,0.8)] to-85%'
)

interface ImageGridProps {
  images: GridImage[]
  onImageClick: (index: number) => void
  onRemoveImageButtonClick?: (index: number) => void
}

export function ImageGrid({
  images,
  onImageClick,
  onRemoveImageButtonClick,
}: ImageGridProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => {
        if (index % 2 !== 0) return null

        // If the image is the last one in the array, render it as a single image
        if (index + 1 === images.length) {
          return (
            <div key={image.src} className={cn(wrapperClassNames, 'mx-auto')}>
              <button onClick={() => onImageClick(index)}>
                <img
                  src={image.src}
                  alt={`Image ${image.src}`}
                  className="max-h-96"
                />
              </button>
              {renderHoverOverlay(image.caption, index)}
            </div>
          )
        }

        const [leftImage, rightImage] = [image, images[index + 1]]
        const rowPercentages = getRowPercentages(leftImage, rightImage)

        return (
          <Fragment key={leftImage.src}>
            <div
              className={wrapperClassNames}
              style={{ width: `calc(${rowPercentages.left}% - 0.5rem)` }}
            >
              <button onClick={() => onImageClick(index)}>
                <img src={leftImage.src} alt={`leftImage ${leftImage.src}`} />
              </button>
              {renderHoverOverlay(leftImage.caption, index)}
            </div>
            <div
              className={wrapperClassNames}
              style={{ width: `calc(${rowPercentages.right}% - 0.5rem)` }}
            >
              <button onClick={() => onImageClick(index + 1)}>
                <img src={rightImage.src} alt={`Image ${rightImage.src}`} />
              </button>
              {renderHoverOverlay(rightImage.caption, index + 1)}
            </div>
          </Fragment>
        )
      })}
    </div>
  )

  function renderHoverOverlay(caption: Descendant, index: number) {
    return (
      <div className={hoverOverlayClassNames}>
        <StaticSlate element={caption} />
        {onRemoveImageButtonClick !== undefined ? (
          <button
            className={cn(
              'pointer-events-auto absolute right-4 top-4 h-8 w-8 rounded-full p-1',
              'bg-black bg-opacity-20 text-white hover:bg-opacity-50'
            )}
            onClick={(event) => {
              event.stopPropagation()
              onRemoveImageButtonClick(index)
            }}
          >
            <FaIcon icon={faTrashCan} className="text-sm" />
          </button>
        ) : null}
      </div>
    )
  }
}
