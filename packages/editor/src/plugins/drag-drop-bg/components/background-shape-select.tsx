import type { DragDropBgProps } from '..'
import { DragDropBgToolbar } from '../toolbar'
import { BackgroundShape } from '../types'

const shapeOptions = [
  BackgroundShape.Square,
  BackgroundShape.Portrait,
  BackgroundShape.Landscape,
]

export function BackgroundShapeSelect(props: DragDropBgProps) {
  const { state, id } = props
  const { canvasShape } = state

  return (
    <>
      <DragDropBgToolbar id={id} />
      <h1 className="flex flex-row items-center justify-center pt-5">
        Default shape:
      </h1>
      <div className="flex flex-row items-center justify-center">
        {shapeOptions.map((shape) => (
          <button
            key={shape}
            className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
            onClick={() => canvasShape.set(shape)}
          >
            {shape.charAt(0).toUpperCase() + shape.slice(1)}
          </button>
        ))}
      </div>
    </>
  )
}
