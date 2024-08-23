import { Photo } from 'react-photo-album'

const aspectRatio = (height: number, width: number) => {
  if (height > width) {
    return { width: 1, height: height / width }
  } else {
    return { height: 1, width: width / height }
  }
}

export const createGalleryPhoto = (
  imageId: string,
  imageUrl: string
): Promise<Photo> => {
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
): Promise<Photo[]> => {
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
