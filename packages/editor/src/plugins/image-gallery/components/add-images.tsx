import IconChoose from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-layered-images.svg'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { v4 as uuidv4 } from 'uuid'

import type { ImageGalleryProps } from '..'

export function createImagePlugin(url: string, caption: string) {
  return {
    plugin: EditorPluginType.Image,
    state: {
      src: url,
      caption: {
        plugin: EditorPluginType.Text,
        state: [
          {
            type: 'p',
            children: [
              {
                text: caption,
              },
            ],
          },
        ],
        id: uuidv4(),
      },
    },
    id: uuidv4(),
  }
}

interface AddImagesProps extends ImageGalleryProps {
  onAddImages: () => void
}

export function AddImages(props: AddImagesProps) {
  const { state, onAddImages } = props
  const onClickAddImages = () => {
    state.images.insert(0, createImagePlugin('', ''))
    onAddImages()
  }
  return (
    <div className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md">
      <button
        className="mx-auto my-20 block rounded-md"
        data-qa="plugin-image-gallery-add-images-button"
        onClick={() => onClickAddImages()}
      >
        <IconChoose className="text-editor-primary-100 hover:cursor-pointer hover:text-editor-primary-200" />
      </button>
    </div>
  )
}
