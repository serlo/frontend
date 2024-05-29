import { selectDocument, useAppSelector } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import type { DragDropBgProps } from '.'
import { EditorCanvas } from './components/editor/EditorCanvas'
import { AnswerZonesContext } from './context/context'
import { DragDropBgToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'

export function DragDropBgEditor({ state, id }: DragDropBgProps) {
  const { backgroundImage, backgroundType, canvasShape } = state
  const bgImagePluginState = useAppSelector((state) =>
    selectDocument(state, backgroundImage.get())
  ) as EditorImageDocument
  const backgroundImageUrlFromPlugin =
    bgImagePluginState?.state?.src || ('' as string)

  const onClickAddAnswerZone = () => {
    const currentLength = state.answerZones.length
    state.answerZones.insert(currentLength, {
      id: `${id}-answerZone-${currentLength}`,
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

  const blankVsImage = (
    <>
      <DragDropBgToolbar onClickAddAnswerZone={onClickAddAnswerZone} id={id}>
        <></>
      </DragDropBgToolbar>
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

  const shapeSelection = (
    <div>
      <h1 className="flex flex-row items-center justify-center">
        Default shape:
      </h1>
      <div className="flex flex-row items-center justify-center">
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => canvasShape.set('square')}
        >
          Square
        </button>
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => canvasShape.set('portrait')}
        >
          Portrait
        </button>
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => canvasShape.set('landscape')}
        >
          Landscape
        </button>
      </div>
    </div>
  )

  const isBlankBg = backgroundType.get() === 'text'
  const isImageBg = backgroundType.get() === 'image'

  const isBgTypeSelected = isBlankBg || isImageBg
  const isShapeSelected = canvasShape.get()

  if (!isBgTypeSelected) return blankVsImage
  if (!isShapeSelected) return shapeSelection

  const hasImgUrl = !!backgroundImageUrlFromPlugin
  const isBackgroundDefined = isBlankBg || (isImageBg && hasImgUrl)

  if (!isBackgroundDefined) {
    return backgroundImage.render({ config: {} })
  }

  return (
    <>
      <AnswerZonesContext.Provider
        value={{
          zones: state.answerZones,
        }}
      >
        <DragDropBgToolbar onClickAddAnswerZone={onClickAddAnswerZone} id={id}>
          <></>
        </DragDropBgToolbar>
        <EditorCanvas state={state} config={{}} id={id} focused={false} />
      </AnswerZonesContext.Provider>
    </>
  )
}
