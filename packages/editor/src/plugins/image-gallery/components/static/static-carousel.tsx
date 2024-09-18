import { GridImage } from '../../types'

interface StaticCarouselProps {
  images: GridImage[]
  onImageClick: (index: number) => void
}

export function StaticCarousel({ images, onImageClick }: StaticCarouselProps) {
  return (
    <div className="flex snap-x snap-mandatory items-center gap-x-4 overflow-x-auto px-[10%]">
      {images.map(({ src, alt, caption }, index) => (
        <button
          key={index}
          className="w-full flex-shrink-0 snap-center snap-always text-center"
          onClick={() => onImageClick(index)}
        >
          <img src={src} alt={alt} />
          <div className="mt-3">
            {caption ? (
              <div className="italic text-gray-700 [&_a]:text-brand-400">
                {caption}
              </div>
            ) : null}
            <div className="text-sm text-gray-400">{`${index + 1}/${images.length}`}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
