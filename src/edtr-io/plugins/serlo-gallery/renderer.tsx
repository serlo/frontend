import clsx from 'clsx'
import { Fragment } from 'react'

export interface SerloGalleryRendererProps {
  images: JSX.Element[]
}

export const SerloGalleryRenderer = ({ images }: SerloGalleryRendererProps) => {
  if (images.length === 0) return null

  const twoGrid = images.length < 5 && images.length % 2 === 0

  //TODO: check spacings

  return (
    <div
      className={clsx(
        'mobile:grid',
        twoGrid ? 'mobile:grid-cols-2' : 'mobile:grid-cols-3'
        // 'lg:grid-cols-3'
      )}
    >
      {images.map((image) => (
        <Fragment key={image.key}>{image}</Fragment>
      ))}
    </div>
  )
}
