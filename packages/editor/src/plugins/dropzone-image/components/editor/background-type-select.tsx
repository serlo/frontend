import IconBlankBg from '@editor/editor-ui/assets/plugin-icons/dropzone-image/blank-landscape.svg'
import IconImageBg from '@editor/editor-ui/assets/plugin-icons/dropzone-image/image-background.svg'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { DropzoneImageProps } from '../..'
import { BackgroundShape, BackgroundType } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function BackgroundTypeSelect({
  backgroundType,
  backgroundImage,
  canvasShape,
}: DropzoneImageProps['state']) {
  const backgroundTypeStrings =
    useEditorStrings().plugins.dropzoneImage.backgroundType

  return (
    <>
      <div className="m-6 flex items-center justify-center p-6 py-8 text-gray-500">
        {backgroundTypeStrings.description}
      </div>
      <div className="flex flex-row items-center justify-center gap-6">
        <button
          data-qa="plugin-dropzone-image-background-type-select-image"
          className="m-q[20px] flex flex-col items-center justify-center gap-4 rounded-[5px] bg-orange-100 p-[10px] py-4 font-bold text-almost-black  hover:bg-orange-200"
          onClick={() => {
            backgroundType.set(BackgroundType.Image)
            if (!backgroundImage.defined)
              backgroundImage.create({ plugin: EditorPluginType.Image })

            canvasShape.set(BackgroundShape.Unset)
          }}
        >
          <IconImageBg />
          {backgroundTypeStrings.image}
        </button>
        <span>oder</span>
        <button
          data-qa="plugin-dropzone-image-background-type-select-blank"
          className="qm-[20px] flex flex-col items-center justify-center gap-4 rounded-[5px] bg-orange-100 p-[10px] py-4 font-bold text-almost-black hover:bg-orange-200"
          onClick={() => {
            backgroundType.set(BackgroundType.Blank)
            canvasShape.set(BackgroundShape.Unset)
          }}
        >
          <IconBlankBg />
          {backgroundTypeStrings.blank}
        </button>
      </div>
    </>
  )
}
