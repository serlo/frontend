import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'

import { GridImage } from '../../types'

interface StaticCarouselImageProps {
  image: GridImage
  position: string
}

export function StaticCarouselImage({
  image,
  position,
}: StaticCarouselImageProps) {
  return (
    <div className="w-4/5 flex-shrink-0 text-center">
      <img
        src={image.src}
        // TODO: get actual alt text or fallback
        alt={`Image ${image.src}`}
        className="h-auto w-full"
      />
      <div className="mt-3">
        {image.caption ? (
          <div className="italic text-gray-700 [&_a]:text-brand-400">
            <StaticSlate element={image.caption} />
          </div>
        ) : null}
        <div className="text-sm text-gray-400">{position}</div>
      </div>
    </div>
  )
}
