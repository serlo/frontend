import { isEmptyTextDocument } from '@editor/plugins/text/utils/static-is-empty'
import { EditorImageGalleryDocument } from '@editor/types/editor-plugins'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useState } from 'react'
import { Descendant } from 'slate'

import { ImageGrid } from './components/image-grid'
import { StaticCarousel } from './components/static/static-carousel'
import { StaticLightbox } from './components/static/static-lightbox'
import { StaticLightboxMobile } from './components/static/static-lightbox-mobile'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isMobileLightboxOpen, setIsMobileLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  )

  const imageDocuments = state.images.map((item) => item.imagePlugin)
  const filteredImageDocuments = imageDocuments.filter(isImageDocument)
  const images = filteredImageDocuments.map(
    ({ state: { src, caption } }, index) => ({
      src: src as string,
      dimensions: state.images[index].dimensions,
      caption: isEmptyTextDocument(caption)
        ? undefined
        : // @ts-expect-error - Get caption text
          (caption?.state?.[0] as Descendant),
    })
  )

  function handleGridImageClick(index: number) {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  function handleCarouselImageClick(index: number) {
    setCurrentImageIndex(index)
    setIsMobileLightboxOpen(true)
  }

  const isLoading = images.some((image) => image.dimensions.width === 0)

  // Only happens in editor preview
  if (isLoading) return null

  return (
    <>
      <div className="hidden p-4 sm:block">
        <ImageGrid images={images} onImageClick={handleGridImageClick} />

        {images.length && currentImageIndex !== null ? (
          <StaticLightbox
            images={images}
            isOpen={isLightboxOpen}
            currentImageIndex={currentImageIndex}
            setIsOpen={setIsLightboxOpen}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        ) : null}
      </div>

      <div className="sm:hidden">
        <StaticCarousel
          images={images}
          onImageClick={handleCarouselImageClick}
        />

        {images.length && currentImageIndex !== null ? (
          <StaticLightboxMobile
            images={images}
            isOpen={isMobileLightboxOpen}
            currentImageIndex={currentImageIndex}
            setIsOpen={setIsMobileLightboxOpen}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        ) : null}
      </div>
    </>
  )
}
