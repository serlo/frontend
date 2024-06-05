import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import type { DragDropBgProps } from '../..'
import { DragDropBgToolbar } from '../../toolbar'
import { BackgroundShape, BackgroundType } from '../../types'

export function BackgroundTypeSelect(props: DragDropBgProps) {
  const { state, id } = props
  const { backgroundType, backgroundImage, canvasShape } = state

  return (
    <>
      <DragDropBgToolbar id={id} />
      <div className="flex flex-row items-center justify-center">
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => {
            backgroundType.set(BackgroundType.Blank)
            canvasShape.set(BackgroundShape.Unset)
          }}
        >
          Blank
        </button>
        <span>oder</span>
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => {
            backgroundType.set(BackgroundType.Image)
            if (!backgroundImage.defined)
              backgroundImage.create({ plugin: EditorPluginType.Image })

            canvasShape.set(BackgroundShape.Unset)
          }}
        >
          Image <FaIcon icon={faImage} />
        </button>
      </div>
    </>
  )
}
