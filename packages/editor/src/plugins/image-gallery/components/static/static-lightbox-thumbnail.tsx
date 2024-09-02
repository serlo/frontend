import type { GridImage } from '../../types'
import { cn } from '@/helper/cn'

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
  return (
    <button className="group relative" onClick={onClick}>
      <img
        src={image.src}
        // TODO: get actual alt text or fallback
        alt={`Image ${image.src}`}
        className="max-h-[120px] bg-white"
      />
      <div
        className={cn(
          'absolute inset-0 bg-black bg-opacity-70 group-hover:block',
          isSelected ? 'block' : 'hidden'
        )}
      ></div>
    </button>
  )
}