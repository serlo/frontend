import IconLandscape from '@editor/editor-ui/assets/plugin-icons/drag-drop/blank-landscape.svg'
import IconPortrait from '@editor/editor-ui/assets/plugin-icons/drag-drop/portrait.svg'
import IconSquare from '@editor/editor-ui/assets/plugin-icons/drag-drop/square.svg'

import type { DragDropBgProps } from '../..'
import { DragDropBgToolbar } from '../../toolbar'
import { BackgroundShape } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

const shapeOptions = [
  BackgroundShape.Square,
  BackgroundShape.Landscape,
  BackgroundShape.Portrait,
]

const IconMap = {
  [BackgroundShape.Unset]: <> </>,
  [BackgroundShape.Square]: <IconSquare />,
  [BackgroundShape.Portrait]: <IconPortrait />,
  [BackgroundShape.Landscape]: <IconLandscape />,
}

export function BackgroundShapeSelect(props: DragDropBgProps) {
  const { state, id } = props
  const { canvasShape } = state
  const shapeStrings = useEditorStrings().plugins.dragDropBg.backgroundShapes

  return (
    <>
      <DragDropBgToolbar id={id} />
      <h2 className="mt-6 flex flex-row items-center justify-center pt-10 font-bold text-almost-black">
        {shapeStrings.description}
      </h2>
      <div className="flex flex-row items-center justify-center">
        {shapeOptions.map((shape) => (
          <button
            data-qa={`plugin-drag-drop-bg-background-shape-select-${shape}`}
            key={shape}
            className="m-[20px] flex h-32 w-32 flex-col items-center justify-between rounded-[5px] bg-orange-100 p-[10px] hover:bg-orange-200"
            onClick={() => canvasShape.set(shape)}
          >
            <div className="flex flex-grow items-center justify-center">
              {IconMap[shape]}
            </div>
            {shape !== BackgroundShape.Unset ? (
              <div className="mb-2 font-bold text-almost-black">
                {shapeStrings[shape]}
              </div>
            ) : (
              ''
            )}
          </button>
        ))}
      </div>
    </>
  )
}
