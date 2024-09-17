import { lazy, Suspense, useCallback } from 'react'

import { StaticLightboxImage } from './static-lightbox-image'
import { StaticLightboxSlider } from './static-lightbox-slider'
import { StaticLightboxThumbnail } from './static-lightbox-thumbnail'
import { GridImage } from '../../types'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

const ModalWithCloseButton = lazy(() =>
  import('@/components/modal-with-close-button').then((module) => ({
    default: module.ModalWithCloseButton,
  }))
)

interface StaticLightboxProps {
  images: GridImage[]
  isOpen: boolean
  currentImageIndex: number
  setIsOpen: (isOpen: boolean) => void
  setCurrentImageIndex: (index: number | null) => void
}

export function StaticLightbox({
  images,
  isOpen,
  currentImageIndex,
  setIsOpen,
  setCurrentImageIndex,
}: StaticLightboxProps) {
  const title = useInstanceData().strings.content.imageGalleryLightboxSrTitle

  function closeModal(isOpen: boolean) {
    if (isOpen) return
    setCurrentImageIndex(null)
    setIsOpen(false)
  }

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    )
  }, [currentImageIndex, images.length, setCurrentImageIndex])

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    )
  }, [currentImageIndex, images.length, setCurrentImageIndex])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalWithCloseButton
        className="top-1/2 w-auto max-w-[95%] rounded-lg bg-gray-700 px-4 pb-14 pt-16"
        extraCloseButtonClassName="text-gray-400 hover:bg-gray-600 hover:text-gray-200"
        extraOverlayClassName="bg-gray-700 bg-opacity-80"
        extraTitleClassName="sr-only"
        title={title}
        isOpen={isOpen}
        setIsOpen={closeModal}
      >
        {images.length < 2 ? (
          <StaticLightboxImage {...images[currentImageIndex]} />
        ) : (
          <div
            className={cn(
              'grid grid-cols-[32px_1fr_32px] items-center gap-y-3',
              'sm:grid-cols-[32px_600px_32px] sm:gap-x-8',
              'md:grid-cols-[32px_764px_32px] md:gap-x-14'
            )}
          >
            <StaticLightboxSlider
              enabled={isOpen && images.length > 1}
              onPrevious={goToPreviousImage}
              onNext={goToNextImage}
            >
              <StaticLightboxImage {...images[currentImageIndex]} />
            </StaticLightboxSlider>

            <div className="col-start-2 flex justify-center gap-2">
              {images.map((image, index) => (
                <StaticLightboxThumbnail
                  key={index}
                  image={image}
                  isSelected={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </ModalWithCloseButton>
    </Suspense>
  )
}
