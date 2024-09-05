import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'

import { GridImage } from '../../types'

interface StaticCarouselProps {
  images: GridImage[]
}

export function StaticCarousel({ images }: StaticCarouselProps) {
  return (
    <div className="flex snap-x snap-mandatory items-center gap-x-4 overflow-x-auto px-[10%]">
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
              <div className="italic text-gray-700 [&_a]:text-brand-400">
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
