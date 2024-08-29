import { GridImage } from '../types'

export const createGalleryImage = ({
  src,
  caption,
}: Omit<GridImage, 'width' | 'height'>): Promise<GridImage> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    void img.decode().then(() => {
      const width = img.naturalWidth
      const height = img.naturalHeight
      resolve({ src, caption, width, height })
    })
  })
}
