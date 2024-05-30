import { selectDocument, useAppSelector } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { faImage, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
  const { backgroundImage, backgroundType, canvasShape, visibleDropZones } =
    state
  const bgImagePluginState = useAppSelector((state) =>
    selectDocument(state, backgroundImage.get())
  ) as EditorImageDocument
  const backgroundImageUrlFromPlugin = bgImagePluginState?.state?.src || ''

  const { currentAnswerZone, selectAnswerZone, insertAnswerZone } =
    useAnswerZones(props)

  const renderBlankVsImage = () => (
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

  const renderShapeSelection = () => (
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

  const isBlankBg = backgroundType.get() === 'text'
  const isImageBg = backgroundType.get() === 'image'
  const isBgTypeSelected = isBlankBg || isImageBg
  const isShapeSelected = canvasShape.get()

  if (!isBgTypeSelected) return renderBlankVsImage()
  if (!isShapeSelected) return renderShapeSelection()

  const hasBackgroundImgUrl = !!backgroundImageUrlFromPlugin
  const isBackgroundDefined = isBlankBg || (isImageBg && hasBackgroundImgUrl)

  if (!isBackgroundDefined) {
    return backgroundImage.render({ config: {} })
  }

  return (
    <AnswerZonesContext.Provider
      value={{
        zones: state.answerZones,
        canvasShape: state.canvasShape.get() as
          | 'square'
          | 'landscape'
          | 'portrait',
        currentAnswerZone: currentAnswerZone,
        selectAnswerZone: selectAnswerZone,
      }}
    >
      <DragDropBgToolbar
        onClickAddAnswerZone={insertAnswerZone}
        id={id}
        showSettingsButton={isImageBg}
      >
        <div className="h-100 border-1 flex flex-row items-center justify-center border-black">
          <button
            onClick={() => {
              visibleDropZones.set(!visibleDropZones.get())
            }}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            data-qa="plugin-multimedia-visibility-button"
          >
            {/* {editorStrings.edtrIo.visibility} */}
            <FaIcon icon={faMagnifyingGlass} /> Visibility
          </button>
        </div>
      </DragDropBgToolbar>
      <EditorCanvas state={state} config={{}} id={id} focused={false} />
    </AnswerZonesContext.Provider>
  )
}
