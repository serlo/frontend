import IconLandscape from '@editor/editor-ui/assets/plugin-icons/dropzone-image/blank-landscape.svg'
import IconPortrait from '@editor/editor-ui/assets/plugin-icons/dropzone-image/portrait.svg'
import IconSquare from '@editor/editor-ui/assets/plugin-icons/dropzone-image/square.svg'
import { SelectionCard } from '@editor/editor-ui/selection-card'
import { useEditorStrings } from '@editor/utils/use-editor-strings'

import type { DropzoneImageProps } from '../..'
import { BackgroundShape } from '../../types'

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
      <h2 className="py-6 text-center text-gray-500">
        {shapeStrings.description}
      </h2>
      <div className="flex justify-center gap-6">
        {shapeOptions.map((shape) => (
          <SelectionCard
            key={shape}
            onClick={() => onSelectShape(shape)}
            icon={iconMap[shape]}
            title={shapeStrings[shape]}
            dataQa={`plugin-dropzone-image-background-shape-select-${shape}`}
          />
        ))}
      </div>
    </>
  )
}
