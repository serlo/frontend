import {
  EditorImageDocument,
  EditorImageGalleryDocument,
} from '@editor/types/editor-plugins'
import { useEffect, useState } from 'react'
import { Photo, RowsPhotoAlbum } from 'react-photo-album'

// eslint-disable-next-line import/no-unassigned-import
import 'react-photo-album/rows.css'
// eslint-disable-next-line import/order
import { loadGalleryPhotos } from './utils/helpers'

export function ImageGalleryStaticRenderer({
  state,
}: EditorImageGalleryDocument) {
  const imagesFromState = state.images as EditorImageDocument[]
  const images = imagesFromState.map(({ id, state }) => ({
    id: id as string,
    src: state.src as string,
  }))

  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const orderedIds = state.orderedIds
      ? (JSON.parse(state.orderedIds) as string[])
      : []

    const loadPhotos = async () => {
      try {
        const sortedPhotos = await loadGalleryPhotos(images, orderedIds)
        setPhotos(sortedPhotos)
      } catch (error) {
        console.error('Failed to load photos:', error)
      }
    }

    void loadPhotos()
  }, [images, state.orderedIds])

  return (
    <div className="p-4">
      <RowsPhotoAlbum
        spacing={8}
        padding={0}
        photos={photos}
        rowConstraints={{ maxPhotos: 2 }}
        targetRowHeight={200}
      />
    </div>
  )
}
