import IconChoose from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-layered-images.svg'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface AddImagesButtonProps {
  onClick: () => void
}

export function AddImagesButton(props: AddImagesButtonProps) {
  const { onClick } = props
  const pluginStrings = useEditorStrings().plugins.imageGallery

  return (
    <div className="flex rounded-md bg-yellow-50 p-8 shadow-md">
      <button
        className="mx-auto my-8 rounded-md bg-editor-primary-100 px-16 pb-2 pt-4 hover:cursor-pointer hover:bg-editor-primary-200"
        data-qa="plugin-image-gallery-add-images-button"
        onClick={onClick}
      >
        <IconChoose className="mx-auto" />
        <div className="mt-2 font-bold text-almost-black">
          {pluginStrings.addImages}
        </div>
      </button>
    </div>
  )
}
