import type { ImageGalleryProps } from '.'
import { FirstScreen } from './components/first-screen'
import { ImageGalleryToolbar } from './toolbar'

export function ImageGalleryEditor(props: ImageGalleryProps) {
  const { focused } = props

  return (
    <div className="group/image-gallery" data-qa="plugin-image-gallery-wrapper">
      {focused ? <ImageGalleryToolbar {...props} /> : null}
      <FirstScreen />
    </div>
  )
}
