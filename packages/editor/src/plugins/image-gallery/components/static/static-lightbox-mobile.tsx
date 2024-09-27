import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { useContentStrings } from '@editor/utils/use-content-strings'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { lazy, Suspense, UIEvent } from 'react'

import { StaticLightboxCarousel } from './static-lightbox-carousel'
import { GridImage } from '../../types'

const EditorModal = lazy(() =>
  import('@editor/editor-ui/editor-modal').then((module) => ({
    default: module.EditorModal,
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
  const title = useContentStrings().imageGalleryLightboxSrTitle

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
      <EditorModal
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
      </EditorModal>
    </Suspense>
  )
}
