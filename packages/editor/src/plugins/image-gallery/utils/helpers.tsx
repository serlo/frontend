import { GridImage } from '../types'

const aspectRatio = (height: number, width: number) => {
  if (height > width) {
    return { width: 1, height: height / width }
  } else {
    return { height: 1, width: width / height }
  }
}

const createGalleryImages = (imageUrl: string): Promise<GridImage> => {
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

export const loadGalleryImages = async (
  imageUrls: string[]
): Promise<GridImage[]> => {
  const imagePromises = imageUrls.map((src) => createGalleryImages(src))
  return await Promise.all(imagePromises)
}

export const getRowPercentages = (image1: GridImage, image2: GridImage) => {
  const commonHeight = Math.min(image1.height, image2.height)

  const leftWidth = (image1.width / image1.height) * commonHeight
  const rightWidth = (image2.width / image2.height) * commonHeight

  const leftPercentage = (leftWidth / (leftWidth + rightWidth)) * 100
  const rightPercentage = (rightWidth / (leftWidth + rightWidth)) * 100

  return { left: leftPercentage, right: rightPercentage }
}
