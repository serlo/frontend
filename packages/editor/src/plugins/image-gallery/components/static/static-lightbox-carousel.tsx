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
      {images.map(({ src, alt, caption }, index) => (
        <div
          key={index}
          className="w-full flex-shrink-0 snap-center snap-always text-center"
        >
          <img src={src} alt={alt} />
          <div className="mt-3">
            {caption ? (
              <div className="italic text-gray-100 [&_a]:text-brand-400">
                {caption}
              </div>
            ) : null}
            <div className="text-sm text-gray-400">{`${index + 1}/${images.length}`}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
