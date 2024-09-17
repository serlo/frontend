import { isEmptyTextDocument } from '@editor/plugins/text/utils/static-is-empty'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorImageGalleryDocument } from '@editor/types/editor-plugins'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useState } from 'react'

import { ImageGrid } from './components/image-grid'
import { StaticCarousel } from './components/static/static-carousel'
import { StaticLightbox } from './components/static/static-lightbox'
import { StaticLightboxMobile } from './components/static/static-lightbox-mobile'
import { getAltOrFallback } from '../image/utils/get-alt-or-fallback'
import { useInstanceData } from '@/contexts/instance-context'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isMobileLightboxOpen, setIsMobileLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  )
  const instanceData = useInstanceData()

  const imageDocuments = state.images
    .map((item) => item.imagePlugin)
    .filter(isImageDocument)

  const images = imageDocuments.map(
    ({ state: { src, caption, alt } }, index) => {
      const hasVisibleCaption = caption && !isEmptyTextDocument(caption)

      return {
        src: String(src),
        alt: getAltOrFallback(instanceData, caption, alt),
        dimensions: state.images[index].dimensions,
        caption: hasVisibleCaption ? (
          <StaticRenderer document={caption} />
        ) : null,
      }
    }
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
