import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'

import { GridImage } from '../../types'
import { cn } from '@/helper/cn'

interface StaticLightboxImageProps {
  image: GridImage
}

export function StaticLightboxImage({ image }: StaticLightboxImageProps) {
  if (!image.caption) {
    return <img src={image.src} className="max-h-[60vh] bg-white" />
  }

  return (
    <div className="relative">
      <img src={image.src} className="max-h-[60vh] bg-white" />
      <div
        className={cn(
          'absolute inset-0 flex items-end justify-center p-3 italic text-white',
          'bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.15)] via-70% to-[rgba(0,0,0,0.8)] to-85%'
        )}
      >
        <div className="text-center [&_a]:text-brand-400">
          <StaticSlate element={image.caption} />
        </div>
      </div>
    </div>
  )
}
