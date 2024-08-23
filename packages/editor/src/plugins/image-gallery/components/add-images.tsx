import IconChoose from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-layered-images.svg'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AddImagesProps {
  onAddImages: () => void
}

export function AddImages(props: AddImagesProps) {
  const { onAddImages } = props
  const pluginStrings = useEditorStrings().plugins.imageGallery

  return (
    <div className="flex rounded-md bg-yellow-50 p-8 shadow-md">
      <button
        className="mx-auto my-8 rounded-md bg-editor-primary-100 px-16 pb-2 pt-4 hover:cursor-pointer hover:bg-editor-primary-200"
        data-qa="plugin-image-gallery-add-images-button"
        onClick={onAddImages}
      >
        <IconChoose className="mx-auto" />
        <div className="mt-2 font-bold">{pluginStrings.addImages}</div>
      </button>
    </div>
  )
}
