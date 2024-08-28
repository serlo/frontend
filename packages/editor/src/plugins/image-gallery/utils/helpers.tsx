import { GridImage } from '../types'

const aspectRatio = (height: number, width: number) => {
  if (height > width) {
    return { width: 1, height: height / width }
  } else {
    return { height: 1, width: width / height }
  }
}

const createGalleryPhoto = (imageUrl: string): Promise<GridImage> => {
  return new Promise((resolve) => {
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
  })
}

export const loadGalleryPhotos = async (
  imageUrls: string[]
): Promise<GridImage[]> => {
  const photoPromises = imageUrls.map((src) => createGalleryPhoto(src))
  return await Promise.all(photoPromises)
}

export const getRowPercentages = (photo1: GridImage, photo2: GridImage) => {
  const commonHeight = Math.min(photo1.height, photo2.height)

  const leftWidth = (photo1.width / photo1.height) * commonHeight
  const rightWidth = (photo2.width / photo2.height) * commonHeight

  const leftPercentage = (leftWidth / (leftWidth + rightWidth)) * 100
  const rightPercentage = (rightWidth / (leftWidth + rightWidth)) * 100

  return { left: leftPercentage, right: rightPercentage }
}
