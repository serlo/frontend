import IconLandscape from '@editor/editor-ui/assets/plugin-icons/dropzone-image/blank-landscape.svg'
import IconPortrait from '@editor/editor-ui/assets/plugin-icons/dropzone-image/portrait.svg'
import IconSquare from '@editor/editor-ui/assets/plugin-icons/dropzone-image/square.svg'

import type { DropzoneImageProps } from '../..'
import { BackgroundShape } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const defaultLargeCanvasDimension = 600
export const defaultSmallCanvasDimension = 400

type SelectableShapeOption =
  | BackgroundShape.Square
  | BackgroundShape.Landscape
  | BackgroundShape.Portrait

const shapeOptions: SelectableShapeOption[] = [
  BackgroundShape.Square,
  BackgroundShape.Landscape,
  BackgroundShape.Portrait,
]

const iconMap = {
  [BackgroundShape.Square]: <IconSquare />,
  [BackgroundShape.Portrait]: <IconPortrait />,
  [BackgroundShape.Landscape]: <IconLandscape />,
}

const canvasDimensionsMap = {
  [BackgroundShape.Square]: {
    canvasHeight: defaultLargeCanvasDimension,
    canvasWidth: defaultLargeCanvasDimension,
  },
  [BackgroundShape.Landscape]: {
    canvasHeight: defaultSmallCanvasDimension,
    canvasWidth: defaultLargeCanvasDimension,
  },
  [BackgroundShape.Portrait]: {
    canvasHeight: defaultLargeCanvasDimension,
    canvasWidth: defaultSmallCanvasDimension,
  },
}

export function BackgroundShapeSelect({
  canvasShape,
  canvasDimensions,
}: DropzoneImageProps['state']) {
  const shapeStrings = useEditorStrings().plugins.dropzoneImage.backgroundShapes

  const onSelectShape = (shape: SelectableShapeOption) => {
    const dimensions = canvasDimensionsMap[shape]
    canvasDimensions.height.set(dimensions.canvasHeight)
    canvasDimensions.width.set(dimensions.canvasWidth)
    canvasShape.set(shape)
  }

  return (
    <>
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
              {iconMap[shape]}
            </div>
            <div className="mb-2 font-bold text-almost-black">
              {shapeStrings[shape]}
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
