import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import type { DragDropBgProps } from '..'
import { DragDropBgToolbar } from '../toolbar'

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
            backgroundType.set('blank')
            canvasShape.set('')
          }}
        >
          Blank
        </button>
        <span>oder</span>
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => {
            backgroundType.set('image')
            if (!backgroundImage.defined)
              backgroundImage.create({ plugin: EditorPluginType.Image })

            canvasShape.set('')
          }}
        >
          Image <FaIcon icon={faImage} />
        </button>
      </div>
    </>
  )
}
