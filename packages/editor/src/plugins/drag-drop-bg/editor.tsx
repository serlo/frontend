import { selectDocument, useAppSelector } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import type { DragDropBgProps } from '.'
import { BackgroundShapeSelect } from './components/background-shape-select'
import { BackgroundTypeSelect } from './components/background-type-select'
import { EditorCanvas } from './components/editor/editor-canvas'
import { AnswerZonesContext } from './context/context'
import { useAnswerZones } from './hooks/use-answer-zones'
import { DragDropBgToolbar } from './toolbar'
import { BackgroundType, BackgroundShape } from './types'

export function DragDropBgEditor(props: DragDropBgProps) {
  const { state, id } = props
  const { backgroundImage, visibleDropZones } = state
  const isBackgroundImagePluginDefined = backgroundImage.defined

  const backgroundImagePluginState = useAppSelector((state) =>
    selectDocument(
      state,
      isBackgroundImagePluginDefined ? backgroundImage.get() : null
    )
  ) as EditorImageDocument
  const backgroundImageUrlFromPlugin =
    backgroundImagePluginState?.state?.src || ''

  const { currentAnswerZone, selectAnswerZone, insertAnswerZone } =
    useAnswerZones(props)

  const backgroundType = state.backgroundType.get()
  const isBackgroundTypeBlank = backgroundType === BackgroundType.Blank
  const isBackgroundTypeImage = backgroundType === BackgroundType.Image

  if (backgroundType === '') return <BackgroundTypeSelect {...props} />

  const canvasShape = state.canvasShape.get() as BackgroundShape

  if (!canvasShape) return <BackgroundShapeSelect {...props} />

  const hasBackgroundImageUrl = !!backgroundImageUrlFromPlugin
  const isBackgroundSelected =
    isBackgroundTypeBlank || (isBackgroundTypeImage && hasBackgroundImageUrl)

  if (!isBackgroundSelected && isBackgroundImagePluginDefined) {
    return backgroundImage.render()
  }

  return (
    <AnswerZonesContext.Provider
      value={{
        zones: state.answerZones,
        canvasShape,
        currentAnswerZone,
        selectAnswerZone,
      }}
    >
      <DragDropBgToolbar
        onClickAddAnswerZone={insertAnswerZone}
        id={id}
        showSettingsButton={isBackgroundTypeImage}
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
