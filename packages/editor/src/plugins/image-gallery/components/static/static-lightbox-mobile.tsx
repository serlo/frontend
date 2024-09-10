import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { lazy, Suspense, UIEvent } from 'react'

import { StaticLightboxCarousel } from './static-lightbox-carousel'
import { GridImage } from '../../types'
import { useInstanceData } from '@/contexts/instance-context'
import { cn } from '@/helper/cn'

const ModalWithCloseButton = lazy(() =>
  import('@/components/modal-with-close-button').then((module) => ({
    default: module.ModalWithCloseButton,
  }))
)

interface StaticLightboxMobileProps {
  images: GridImage[]
  isOpen: boolean
  currentImageIndex: number
  setIsOpen: (isOpen: boolean) => void
  setCurrentImageIndex: (index: number | null) => void
}

export function StaticLightboxMobile({
  images,
  isOpen,
  currentImageIndex,
  setIsOpen,
  setCurrentImageIndex,
}: StaticLightboxMobileProps) {
  const title = useInstanceData().strings.content.imageGalleryLightboxSrTitle

  function closeModal(isOpen: boolean) {
    if (isOpen) return
    setCurrentImageIndex(null)
    setIsOpen(false)
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    if (event.currentTarget.firstElementChild?.clientWidth === undefined) return
    const newIndex =
      event.currentTarget.scrollLeft /
      event.currentTarget.firstElementChild.clientWidth
    if (newIndex % 1 !== 0) return
    setCurrentImageIndex(newIndex)
  }

  function handlePreviousButtonClick() {
    if (currentImageIndex === 0) return
    setCurrentImageIndex(currentImageIndex - 1)
  }

  function handleNextButtonClick() {
    if (currentImageIndex === images.length - 1) return
    setCurrentImageIndex(currentImageIndex + 1)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalWithCloseButton
        className="top-1/2 w-auto w-full max-w-full rounded-none bg-gray-700 px-2 pb-14 pt-16"
        extraCloseButtonClassName="text-gray-400 hover:bg-gray-600 hover:text-gray-200"
        extraOverlayClassName="bg-gray-700 bg-opacity-80"
        extraTitleClassName="sr-only"
        title={title}
        isOpen={isOpen}
        setIsOpen={closeModal}
      >
        <div className="flex items-center justify-between">
          <button
            className={cn(
              'flex p-1 text-gray-400 hover:text-gray-200',
              currentImageIndex === 0 && 'invisible'
            )}
            onClick={handlePreviousButtonClick}
          >
            <FaIcon className="text-2xl" icon={faChevronLeft} />
          </button>

          <StaticLightboxCarousel
            images={images}
            currentImageIndex={currentImageIndex}
            onScroll={handleScroll}
          />

          <button
            className={cn(
              'flex p-1 text-gray-400 hover:text-gray-200',
              currentImageIndex === images.length - 1 && 'invisible'
            )}
            onClick={handleNextButtonClick}
          >
            <FaIcon className="text-2xl" icon={faChevronRight} />
          </button>
        </div>
      </ModalWithCloseButton>
    </Suspense>
  )
}
