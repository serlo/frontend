import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'

import { GridImage } from '../types'
import { cn } from '@/helper/cn'

interface ImageGridProps {
  images: GridImage[]
  extraChildren?: JSX.Element[]
  onImageClick: (index: number) => void
  renderRemoveImageButton?: (index: number) => JSX.Element
}

function getFlex({ dimensions }: GridImage) {
  return { flex: `calc(${dimensions.width} / ${dimensions.height})` }
}

export function ImageGrid({
  images,
  extraChildren,
  onImageClick,
  renderRemoveImageButton,
}: ImageGridProps) {
  return (
    <div>
      {images.map((leftImage, index) => {
        if (index % 2 !== 0) return null

        const rightIndex = index + 1
        const isLastImage = rightIndex === images.length
        const rightImage = isLastImage ? undefined : images[rightIndex]

        return (
          <div className="mb-4 flex gap-4" key={index + leftImage.src}>
            <div
              className={cn('group relative', isLastImage && 'mx-auto')}
              style={isLastImage ? {} : getFlex(leftImage)}
            >
              <button onClick={() => onImageClick(index)}>
                <img
                  src={leftImage.src}
                  // TODO: get actual alt text or fallback
                  alt={`Image ${leftImage.src}`}
                  className={cn(isLastImage && 'max-h-96')}
                />
              </button>
              {extraChildren?.[index]}
              {renderHoverOverlay(leftImage.caption, index)}
            </div>
            {rightImage ? (
              <div className="group relative" style={getFlex(rightImage)}>
                <button onClick={() => onImageClick(rightIndex)}>
                  <img src={rightImage.src} alt={`Image ${rightImage.src}`} />
                </button>
                {extraChildren?.[rightIndex]}
                {renderHoverOverlay(rightImage.caption, rightIndex)}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )

  function renderHoverOverlay(caption: GridImage['caption'], index: number) {
    return (
      <div
        className={cn(
          'absolute inset-0 flex items-end justify-center p-3 italic text-white',
          'pointer-events-none opacity-0 transition-opacity duration-100 group-hover:opacity-100',
          caption &&
            'bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.15)] via-70% to-[rgba(0,0,0,0.8)] to-85%'
        )}
      >
        {caption ? (
          <div className="pointer-events-auto text-center [&_a]:text-brand-400">
            <StaticSlate element={caption} />
          </div>
        ) : null}
        {renderRemoveImageButton?.(index)}
      </div>
    )
  }
}
