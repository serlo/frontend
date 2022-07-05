import clsx from 'clsx'
import { Fragment } from 'react'

export interface SerloGalleryRendererProps {
  images: JSX.Element[]
}

//TODO: lightbox …

export const SerloGalleryRenderer = ({ images }: SerloGalleryRendererProps) => {
  if (images.length === 0) return null

  const twoGrid = images.length < 5 && images.length % 2 === 0

  return (
    <div
      className={clsx(
        'serlo-gallery grid grid-cols-2',
        twoGrid ? '' : 'sm:grid-cols-3',
        'md:grid-cols-3',
        'my-8'
      )}
    >
      {images.map((image) => (
        <Fragment key={image.key}>{image}</Fragment>
      ))}
    </div>
  )
}
