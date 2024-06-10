import { PreviewButton, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { ImageProps } from '@editor/plugins/image'
import {
  selectDocument,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
import type {
  EditorDragDropBgDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { useState } from 'react'

import { BackgroundShapeSelect } from './background-shape-select'
import { BackgroundTypeSelect } from './background-type-select'
import { EditorCanvas } from './editor-canvas'
import type { DragDropBgProps } from '../..'
import { AnswerZonesContext } from '../../context/context'
import { useAnswerZones } from '../../hooks/use-answer-zones'
import { DragDropBgToolbar } from '../../toolbar'
import {
  BackgroundType,
  BackgroundShape,
  DropzoneVisibility,
} from '../../types'
import { DragDropBgStaticRenderer } from '../static/static'

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

  if (!canvasShape && isBackgroundTypeBlank) {
    return <BackgroundShapeSelect {...props} />
  }

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
        backgroundImageState={{
          id: isBackgroundImagePluginDefined ? backgroundImage.get() : null,
          state: backgroundImagePluginState?.state as unknown as
            | ImageProps['state']
            | undefined,
        }}
      >
        <PreviewButton
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
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
