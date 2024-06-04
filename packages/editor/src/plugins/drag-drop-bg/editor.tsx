import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import { selectDocument, useAppSelector } from '@editor/store'
import type { EditorImageDocument } from '@editor/types/editor-plugins'

import type { DragDropBgProps } from '.'
import { BackgroundShapeSelect } from './components/background-shape-select'
import { BackgroundTypeSelect } from './components/background-type-select'
import { EditorCanvas } from './components/editor/editor-canvas'
import { AnswerZonesContext } from './context/context'
import { useAnswerZones } from './hooks/use-answer-zones'
import { DragDropBgToolbar } from './toolbar'
import { BackgroundType, BackgroundShape, DropzoneVisibility } from './types'

export function DragDropBgEditor(props: DragDropBgProps) {
  const { state, id } = props
  const { backgroundImage, dropzoneVisibility } = state
  const isBackgroundImagePluginDefined = backgroundImage.defined

  const backgroundImagePluginState = useAppSelector((state) =>
    selectDocument(
      state,
      isBackgroundImagePluginDefined ? backgroundImage.get() : null
    )
  ) as EditorImageDocument
  const backgroundImageUrlFromPlugin =
    backgroundImagePluginState?.state?.src || ''

  const {
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    selectAnswerZone,
    selectCurrentAnswer,
    insertAnswerZone,
  } = useAnswerZones(props)

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

  const visibilityOptions = [
    DropzoneVisibility.Full,
    DropzoneVisibility.Partial,
    DropzoneVisibility.None,
  ]

  return (
    <AnswerZonesContext.Provider
      value={{
        zones: state.answerZones,
        canvasShape,
        currentAnswerZone,
        currentAnswerIndex,
        currentAnswerType,
        selectAnswerZone,
        selectCurrentAnswer,
        dropzoneVisibility: dropzoneVisibility.get() as DropzoneVisibility,
      }}
    >
      <DragDropBgToolbar
        onClickAddAnswerZone={insertAnswerZone}
        id={id}
        showSettingsButton={isBackgroundTypeImage}
      >
        <div className="h-100 border-1 flex flex-row items-center justify-center border-black">
          <ToolbarSelect
            tooltipText="Dropzone Visibility"
            value={dropzoneVisibility.value}
            dataQa="plugin-blanks-mode-switch"
            changeValue={(value) => dropzoneVisibility.set(value)}
            options={visibilityOptions.map((option) => ({
              text: option.charAt(0).toUpperCase() + option.slice(1),
              value: option,
            }))}
          />
        </div>
      </DragDropBgToolbar>
      <EditorCanvas state={state} config={{}} id={id} focused={false} />
    </AnswerZonesContext.Provider>
  )
}
