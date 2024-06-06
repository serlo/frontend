import IconBlankBg from '@editor/editor-ui/assets/plugin-icons/drag-drop/blank-landscape.svg'
import IconImageBg from '@editor/editor-ui/assets/plugin-icons/drag-drop/image-background.svg'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { DragDropBgProps } from '../..'
import { DragDropBgToolbar } from '../../toolbar'
import { BackgroundShape, BackgroundType } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function BackgroundTypeSelect(props: DragDropBgProps) {
  const { state, id } = props
  const { backgroundType, backgroundImage, canvasShape } = state
  const backgroundTypeStrings =
    useEditorStrings().plugins.dragDropBg.backgroundType

  return (
    <>
      <DragDropBgToolbar id={id} />
      <div className="m-6 flex items-center justify-center p-6 py-8 text-gray-500">
        {backgroundTypeStrings.description}
      </div>
      <div className="flex flex-row items-center justify-center gap-6">
        <button
          data-qa="plugin-drag-drop-bg-background-type-select-image"
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
          data-qa="plugin-drag-drop-bg-background-type-select-blank"
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
