import IconBlankBg from '@editor/editor-ui/assets/plugin-icons/dropzone-image/blank-landscape.svg'
import IconImageBg from '@editor/editor-ui/assets/plugin-icons/dropzone-image/image-background.svg'
import { SelectionCard } from '@editor/editor-ui/selection-card'
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
      <div className="py-6 text-center text-gray-500">
        {backgroundTypeStrings.description}
      </div>
      <div className="flex justify-center gap-6">
        <SelectionCard
          onClick={() => {
            backgroundType.set(BackgroundType.Image)
            if (!backgroundImage.defined)
              backgroundImage.create({ plugin: EditorPluginType.Image })

            canvasShape.set(BackgroundShape.Unset)
          }}
          icon={<IconImageBg />}
          title={backgroundTypeStrings.image}
          dataQa="plugin-dropzone-image-background-type-select-image"
        />
        <SelectionCard
          onClick={() => {
            backgroundType.set(BackgroundType.Blank)
            canvasShape.set(BackgroundShape.Unset)
          }}
          icon={<IconBlankBg />}
          title={backgroundTypeStrings.blank}
          dataQa="plugin-dropzone-image-background-type-select-blank"
        />
      </div>
    </>
  )
}
