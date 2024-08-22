import IconChoose from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-layered-images.svg'

interface AddImagesProps {
  onAddImages: () => void
}

export function AddImages(props: AddImagesProps) {
  const { onAddImages } = props
  return (
    <div className="mx-auto rounded-md bg-yellow-50 p-8 shadow-md">
      <button
        className="mx-auto my-20 block rounded-md"
        data-qa="plugin-image-gallery-add-images-button"
        onClick={onAddImages}
      >
        <IconChoose className="text-editor-primary-100 hover:cursor-pointer hover:text-editor-primary-200" />
      </button>
    </div>
  )
}
