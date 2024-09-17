import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import { UIEvent, useEffect, useRef } from 'react'

import { GridImage } from '../../types'

interface StaticLightboxCarouselProps {
  images: GridImage[]
  currentImageIndex: number
  onScroll: (event: UIEvent<HTMLDivElement>) => void
}

export function StaticLightboxCarousel({
  images,
  currentImageIndex,
  onScroll,
}: StaticLightboxCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Set the scroll position to the selected image
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const childWidth = scrollContainer?.firstElementChild?.clientWidth

    if (scrollContainer?.scrollLeft === undefined) return
    if (childWidth === undefined) return

    scrollContainer.scrollLeft = childWidth * currentImageIndex
  }, [currentImageIndex])

  return (
    <div
      ref={scrollContainerRef}
      className="flex snap-x snap-mandatory items-center overflow-x-auto"
      onScroll={onScroll}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="w-full flex-shrink-0 snap-center snap-always text-center"
        >
          <img
            src={image.src}
            // TODO: get actual alt text or fallback
            alt={`Image ${image.src}`}
          />
          <div className="mt-3">
            {image.caption ? (
              <div className="italic text-gray-100 [&_a]:text-brand-400">
                <StaticSlate element={image.caption} />
              </div>
            ) : null}
            <div className="text-sm text-gray-400">{`${index + 1}/${images.length}`}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
