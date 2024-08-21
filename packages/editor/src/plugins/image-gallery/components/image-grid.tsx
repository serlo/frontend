import { arrayMove } from '@dnd-kit/sortable'
import { selectStaticDocument, store } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'
import { useContext, useEffect, useState } from 'react'
import { Photo, RowsPhotoAlbum } from 'react-photo-album'

import { SortableGallery } from './SortableGallery'
import type { ImageGalleryProps } from '..'
import { ImageGalleryPluginContext } from '../contexts/context'
import { ImageGalleryPluginActionTypes } from '../contexts/types'
import { loadGalleryPhotos } from '../utils/gallery-photo-helpers'

interface ImageGridProps extends ImageGalleryProps {}

export const getImageSrcFromState = (imageId: string) => {
  const imgDocument = selectStaticDocument(store.getState(), imageId)
  return isImageDocument(imgDocument) ? (imgDocument.state.src as string) : ''
}

export function ImageGrid(props: ImageGridProps) {
  const { state } = props

  const [photos, setPhotos] = useState<Photo[]>([])

  const { imageGalleryPluginDispatch } = useContext(ImageGalleryPluginContext)

  useEffect(() => {
    const images = state.images.map((id) => ({
      id: id.get(),
      src: getImageSrcFromState(id.get()),
    }))
    const initialOrderedIds = state.orderedIds.get()
      ? (JSON.parse(state.orderedIds.get()) as string[])
      : []

    const loadPhotosAsync = async () => {
      try {
        const sortedPhotos = await loadGalleryPhotos(images, initialOrderedIds)
        setPhotos(sortedPhotos)
      } catch (error) {
        console.error('Failed to load photos:', error)
      }
    }

    void loadPhotosAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openSettingsForImage = (photo: Photo) => {
    if (!photo.key) return
    imageGalleryPluginDispatch({
      type: ImageGalleryPluginActionTypes.OPEN_IMAGE_IN_MODAL,
      payload: {
        imageId: photo.key,
      },
    })
  }

  const movePhoto = (oldIndex: number, newIndex: number) => {
    const updatedPhotos = arrayMove(photos, oldIndex, newIndex)
    setPhotos(updatedPhotos)

    // Save the new order to state
    const updatedOrderedIds = updatedPhotos.map((photo) => photo.key)
    state.orderedIds.set(JSON.stringify(updatedOrderedIds))
  }

  return (
    <SortableGallery
      gallery={RowsPhotoAlbum}
      spacing={8}
      padding={0}
      photos={photos}
      movePhoto={movePhoto}
      rowConstraints={{ maxPhotos: 2 }}
      targetRowHeight={200}
      onClick={({ photo }: { photo: Photo }) => openSettingsForImage(photo)}
    />
  )
}
