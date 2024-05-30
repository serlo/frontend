import { selectDocument, useAppSelector } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

import type { DragDropBgProps } from '.'
import { EditorCanvas } from './components/editor/EditorCanvas'
import { AnswerZonesContext } from './context/context'
import { useAnswerZones } from './hooks/useAnswerZones'
import { DragDropBgToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'

/**
 * DragDropBgEditor component
 *
 * This component represents the drag-and-drop background editor.
 *
 * It allows users to:
 *    select a background type (blank or image),
 *    choose a canvas shape
 *    add / manage answer zones.
 *
 * @param {DragDropBgProps} props - The properties for the DragDropBgEditor component.
 */
export function DragDropBgEditor(props: DragDropBgProps) {
  const { state, id } = props
  const { backgroundImage, backgroundType, canvasShape } = state
  const bgImagePluginState = useAppSelector((state) =>
    selectDocument(state, backgroundImage.get())
  ) as EditorImageDocument
  const backgroundImageUrlFromPlugin =
    bgImagePluginState?.state?.src || ('' as string)

  const {
    currentAnswerZone,
    selectAnswerZone,
    moveAnswerZone,
    getCanvasDimensions,
  } = useAnswerZones(props)

  /**
   * Handler for adding a new answer zone.
   */
  const onClickAddAnswerZone = () => {
    const currentLength = state.answerZones.length
    state.answerZones.insert(currentLength, {
      id: `${id}-answerZone-${currentLength}`,
      name: '',
      position: { left: 20 * currentLength + 1, top: 20 },
      layout: {
        width: 200,
        height: 70,
        visible: true,
        lockedAspectRatio: true,
      },
      answers: [],
    })
  }

  /**
   * Handler for changing the dimensions of an answer zone.
   */
  const onChangeDimensions = useCallback(
    (id: string, dimensions: { width: number; height: number }) => {
      const answerZone = state.answerZones.find((zone) => zone.id.get() === id)
      if (!answerZone) return

      answerZone.layout.width.set(dimensions.width)
      answerZone.layout.height.set(dimensions.height)
    },
    [state.answerZones]
  )

  /**
   * Renders the UI for selecting between a blank or image background.
   */
  const blankVsImage = (
    <>
      <DragDropBgToolbar id={id} />
      <div className="flex flex-row items-center justify-center">
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => {
            backgroundType.set('text')
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
            canvasShape.set('')
          }}
        >
          Image <FaIcon icon={faImage} />
        </button>
      </div>
    </>
  )

  /**
   * Renders the UI for selecting the default shape of the canvas.
   */
  const shapeOptions = ['square', 'portrait', 'landscape']

  const renderButton = (shape: string) => (
    <button
      key={shape}
      className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
      onClick={() => canvasShape.set(shape)}
    >
      {shape.charAt(0).toUpperCase() + shape.slice(1)}
    </button>
  )

  const shapeSelection = (
    <div>
      <DragDropBgToolbar id={id} />
      <h1 className="flex flex-row items-center justify-center pt-5">
        Default shape:
      </h1>
      <div className="flex flex-row items-center justify-center">
        {shapeOptions.map(renderButton)}
      </div>
    </div>
  )

  const isBlankBg = backgroundType.get() === 'text'
  const isImageBg = backgroundType.get() === 'image'

  const isBgTypeSelected = isBlankBg || isImageBg
  const isShapeSelected = canvasShape.get()

  if (!isBgTypeSelected) return blankVsImage
  if (!isShapeSelected) return shapeSelection

  const hasBackgroundImgUrl = !!backgroundImageUrlFromPlugin
  const isBackgroundDefined = isBlankBg || (isImageBg && hasBackgroundImgUrl)

  if (!isBackgroundDefined) {
    return backgroundImage.render({ config: {} })
  }

  const { canvasHeight, canvasWidth } = getCanvasDimensions()

  return (
    <>
      <AnswerZonesContext.Provider
        value={{
          zones: state.answerZones,
          onChangeDimensions: onChangeDimensions,
          canvasShape: state.canvasShape.get() as
            | 'square'
            | 'landscape'
            | 'portrait',
          currentAnswerZone: currentAnswerZone,
          selectAnswerZone: selectAnswerZone,
          moveAnswerZone: moveAnswerZone,
          canvasHeight: canvasHeight,
          canvasWidth: canvasWidth,
        }}
      >
        <DragDropBgToolbar
          onClickAddAnswerZone={onClickAddAnswerZone}
          id={id}
        />
        <EditorCanvas state={state} config={{}} id={id} focused={false} />
      </AnswerZonesContext.Provider>
    </>
  )
}
