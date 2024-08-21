import { EditorImageGalleryDocument } from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'
import { Photo, RowsPhotoAlbum } from 'react-photo-album'
// eslint-disable-next-line import/no-unassigned-import
import 'react-photo-album/rows.css'
// eslint-disable-next-line import/order
import Lightbox, { SlideImage } from 'yet-another-react-lightbox'
// eslint-disable-next-line import/no-unassigned-import
import 'yet-another-react-lightbox/styles.css'
// eslint-disable-next-line import/no-unassigned-import
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { loadGalleryPhotos } from './utils/gallery-photo-helpers'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const images = state.images.map(({ id, state }) => ({
    id: id as string,
    src: state.src as string,
  }))

  const [photos, setPhotos] = useState<Photo[]>([])
  const [slides, setSlides] = useState<SlideImage[]>([])

  useEffect(() => {
    const orderedIds = state.orderedIds
      ? (JSON.parse(state.orderedIds) as string[])
      : []

    const loadPhotos = async () => {
      try {
        const sortedPhotos = await loadGalleryPhotos(images, orderedIds)
        setPhotos(sortedPhotos)
        setSlides(sortedPhotos.map((photo) => ({ src: photo.src })))
      } catch (error) {
        console.error('Failed to load photos:', error)
      }
    }

    void loadPhotos()
  }, [images, state.orderedIds])

  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(-1)

  return (
    <>
      <RowsPhotoAlbum
        spacing={8}
        padding={0}
        photos={photos}
        rowConstraints={{ maxPhotos: 2 }}
        targetRowHeight={200}
        onClick={({ index }) => {
          setLightboxPhotoIndex(index)
        }}
      />
      <Lightbox
        index={lightboxPhotoIndex}
        open={lightboxPhotoIndex > -1}
        close={() => setLightboxPhotoIndex(-1)}
        slides={slides}
        plugins={[Thumbnails, Fullscreen, Slideshow, Zoom]}
      />
    </>
  )
}
