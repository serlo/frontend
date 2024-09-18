import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'

import { GridImage } from '../../types'

interface StaticLightboxImageProps {
  image: GridImage
}

export function StaticLightboxImage({ image }: StaticLightboxImageProps) {
  if (!image.caption) {
    return <img src={image.src} className="max-h-[60vh] bg-white" />
  }

  return (
    <div className="text-center">
      <img
        src={image.src}
        // TODO: get actual alt text or fallback
        alt={`Image ${image.src}`}
        className="max-h-[60vh] bg-white"
      />
      <div className="mt-3 italic text-gray-100 [&_a]:text-brand-400">
        <StaticSlate element={image.caption} />
      </div>
    </div>
  )
}
