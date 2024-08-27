import { GridImage } from '../types'

const aspectRatio = (height: number, width: number) => {
  if (height > width) {
    return { width: 1, height: height / width }
  } else {
    return { height: 1, width: width / height }
  }
}

const createGalleryPhoto = (imageUrl: string): Promise<GridImage> => {
  return new Promise((resolve, reject) => {
    const mockImage = document.createElement('img')
    mockImage.src = imageUrl

    mockImage.onload = function () {
      const aspect = aspectRatio(mockImage.height, mockImage.width)
      resolve({
        src: imageUrl,
        width: aspect.width,
        height: aspect.height,
      })
    }

    mockImage.onerror = function (error: Event | string) {
      // TODO: Implement error handling
      reject(
        `Failed to load image: ${typeof error === 'string' ? error : error.type}`
      )
    }
  })
}

export const loadGalleryPhotos = async (
  imageUrls: string[]
): Promise<GridImage[]> => {
  const photoPromises = imageUrls.map((src) => createGalleryPhoto(src))
  return await Promise.all(photoPromises)
}
