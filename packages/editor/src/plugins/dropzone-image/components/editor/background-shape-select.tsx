import IconLandscape from '@editor/editor-ui/assets/plugin-icons/dropzone-image/blank-landscape.svg'
import IconPortrait from '@editor/editor-ui/assets/plugin-icons/dropzone-image/portrait.svg'
import IconSquare from '@editor/editor-ui/assets/plugin-icons/dropzone-image/square.svg'

import type { DropzoneImageProps } from '../..'
import { DropzoneImageToolbar } from '../../toolbar'
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

export const getCanvasDimensions = (shape: string) => {
  switch (shape) {
    case 'square':
      return { canvasHeight: 786, canvasWidth: 786 }
    case 'landscape':
      return { canvasHeight: 786, canvasWidth: 1024 }
    case 'portrait':
      return { canvasHeight: 1024, canvasWidth: 786 }
    default:
      return { canvasHeight: 786, canvasWidth: 786 }
  }
}

export function BackgroundShapeSelect(props: DropzoneImageProps) {
  const { state, id } = props
  const { canvasShape, canvasDimensions } = state
  const shapeStrings = useEditorStrings().plugins.dropzoneImage.backgroundShapes

  const onSelectShape = (shape: string) => {
    const dimensions = getCanvasDimensions(shape)
    canvasDimensions.height.set(dimensions.canvasHeight)
    canvasDimensions.width.set(dimensions.canvasWidth)
    canvasShape.set(shape)
  }

  return (
    <>
      <DropzoneImageToolbar id={id} />
      <h2 className="mt-6 flex flex-row items-center justify-center pt-10 font-bold text-almost-black">
        {shapeStrings.description}
      </h2>
      <div className="flex flex-row items-center justify-center">
        {shapeOptions.map((shape) => (
          <button
            data-qa={`plugin-dropzone-image-background-shape-select-${shape}`}
            key={shape}
            className="m-[20px] flex h-32 w-32 flex-col items-center justify-between rounded-[5px] bg-orange-100 p-[10px] hover:bg-orange-200"
            onClick={() => onSelectShape(shape)}
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
