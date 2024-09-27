import { cn } from '@editor/utils/cn'

import type { GridImage } from '../../types'

interface StaticLightboxThumbnailProps {
  image: GridImage
  isSelected: boolean
  onClick: () => void
}

export function StaticLightboxThumbnail({
  image,
  isSelected,
  onClick,
}: StaticLightboxThumbnailProps) {
  const { src, alt } = image

  return (
    <button className="group relative" onClick={onClick}>
      <img src={src} alt={alt} className="max-h-[120px] bg-white" />
      <div
        className={cn(
          'absolute inset-0 bg-black bg-opacity-70 group-hover:block',
          isSelected ? 'block' : 'hidden'
        )}
      ></div>
    </button>
  )
}
