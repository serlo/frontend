import { GridImage } from '../types'

type GridImageWithoutDimensions = Omit<GridImage, 'width' | 'height'>

const aspectRatio = (height: number, width: number) => {
  if (height > width) {
    return { width: 1, height: height / width }
  } else {
    return { height: 1, width: width / height }
  }
}

export const createGalleryImage = ({
  src,
  caption,
}: GridImageWithoutDimensions): Promise<GridImage> => {
  return new Promise((resolve) => {
    const mockImage = document.createElement('img')
    mockImage.src = src

    mockImage.onload = function () {
      const { width, height } = aspectRatio(mockImage.height, mockImage.width)
      resolve({ src, caption, width, height })
    }
  })
}

export const getRowPercentages = (image1: GridImage, image2: GridImage) => {
  const commonHeight = Math.min(image1.height, image2.height)

  const leftWidth = (image1.width / image1.height) * commonHeight
  const rightWidth = (image2.width / image2.height) * commonHeight

  const leftPercentage = (leftWidth / (leftWidth + rightWidth)) * 100
  const rightPercentage = (rightWidth / (leftWidth + rightWidth)) * 100

  return { left: leftPercentage, right: rightPercentage }
}
