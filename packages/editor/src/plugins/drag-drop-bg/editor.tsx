import { ToolbarSelect } from '@editor/editor-ui/plugin-toolbar/components/toolbar-select'
import {
  selectDocument,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import type {
  EditorDragDropBgDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useState } from 'react'

import type { DragDropBgProps } from '.'
import { BackgroundShapeSelect } from './components/editor/background-shape-select'
import { BackgroundTypeSelect } from './components/editor/background-type-select'
import { EditorCanvas } from './components/editor/editor-canvas'
import { AnswerZonesContext } from './context/context'
import { useAnswerZones } from './hooks/use-answer-zones'
import { DragDropBgStaticRenderer } from './static'
import { DragDropBgToolbar } from './toolbar'
import { BackgroundType, BackgroundShape, DropzoneVisibility } from './types'

export function DragDropBgEditor(props: DragDropBgProps) {
  const { state, id } = props
  const { backgroundImage, dropzoneVisibility, extraDraggableAnswers } = state
  const isBackgroundImagePluginDefined = backgroundImage.defined

  const [previewActive, setPreviewActive] = useState(false)

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorDragDropBgDocument
  )
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
        extraDraggableAnswers,
      }}
    >
      <DragDropBgToolbar
        onClickAddAnswerZone={insertAnswerZone}
        id={id}
        showSettingsButton={isBackgroundTypeImage}
      >
        <button
          onClick={() => {
            setPreviewActive(!previewActive)
          }}
          className="serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
        >
          Vorschau <FaIcon icon={previewActive ? faCheckCircle : faCircle} />
        </button>
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
      </DragDropBgToolbar>
      {previewActive ? (
        <DragDropBgStaticRenderer {...staticDocument} />
      ) : (
        <EditorCanvas state={state} config={{}} id={id} focused={false} />
      )}
    </AnswerZonesContext.Provider>
  )
}
