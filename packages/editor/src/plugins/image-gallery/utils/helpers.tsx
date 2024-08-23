import { selectStaticDocument, store } from '@editor/store'
import { isImageDocument } from '@editor/types/plugin-type-guards'

import { GridImage } from '../types'

const aspectRatio = (height: number, width: number) => {
  if (height > width) {
    return { width: 1, height: height / width }
  } else {
    return { height: 1, width: width / height }
  }
}

export const getImageSrcFromState = (imageId: string) => {
  const imgDocument = selectStaticDocument(store.getState(), imageId)
  return isImageDocument(imgDocument) ? (imgDocument.state.src as string) : ''
}

export const createGalleryPhoto = (
  imageId: string,
  imageUrl: string
): Promise<GridImage> => {
  return new Promise((resolve, reject) => {
    const mockImage = document.createElement('img')
    mockImage.src = imageUrl

    mockImage.onload = function () {
      const aspect = aspectRatio(mockImage.height, mockImage.width)
      resolve({
        key: imageId,
        src: imageUrl,
        width: aspect.width,
        height: aspect.height,
      })
    }

    mockImage.onerror = function (error: Event | string) {
      reject(
        `Failed to load image: ${typeof error === 'string' ? error : error.type}`
      )
    }
  })
}

export const loadGalleryPhotos = async (
  images: { id: string; src: string }[],
  orderedIds: string[]
): Promise<GridImage[]> => {
  const photoPromises = images.map(({ id, src }) => createGalleryPhoto(id, src))

  try {
    const loadedPhotos = await Promise.all(photoPromises)
    return orderedIds
      ? loadedPhotos.sort((a, b) => {
          const indexA = orderedIds.findIndex(
            (orderedId) => orderedId === a.key
          )
          const indexB = orderedIds.findIndex(
            (orderedId) => orderedId === b.key
          )
          return indexA - indexB
        })
      : loadedPhotos
  } catch (error) {
    console.error('Error loading images:', error)
    throw error
  }
}