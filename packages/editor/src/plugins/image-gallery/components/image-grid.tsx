import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { Descendant } from 'slate'

import { GridImage } from '../types'
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

function getFlexString(img: GridImage) {
  return `calc(${img.width} / ${img.height})`
}

export function ImageGrid({
  images,
  onImageClick,
  onRemoveImageButtonClick,
}: ImageGridProps) {
  return (
    <div>
      {images.map((leftImage, index) => {
        if (index % 2 !== 0) return null

        const isLastImage = index + 1 === images.length
        const rightImage = isLastImage ? undefined : images[index + 1]

        return (
          <div className="mb-4 flex gap-4" key={leftImage.src}>
            <div
              className={cn(wrapperClassNames, isLastImage && 'mx-auto')}
              style={isLastImage ? {} : { flex: getFlexString(leftImage) }}
            >
              <button onClick={() => onImageClick(index)}>
                <img
                  src={leftImage.src}
                  // TODO: get actual alt text or fallback
                  alt={`Image ${leftImage.src}`}
                  className={cn(isLastImage && 'max-h-96')}
                />
              </button>
              {renderHoverOverlay(leftImage.caption, index)}
            </div>
            {rightImage ? (
              <div
                className={wrapperClassNames}
                style={{ flex: getFlexString(rightImage) }}
              >
                <button onClick={() => onImageClick(index + 1)}>
                  <img src={rightImage.src} alt={`Image ${rightImage.src}`} />
                </button>
                {renderHoverOverlay(rightImage.caption, index + 1)}
              </div>
            ) : null}
          </div>
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
