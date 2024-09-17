import { selectStaticDocument, useAppSelector } from '@editor/store'
import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { useState } from 'react'

import type { DropzoneImageProps } from '.'
import { BackgroundShapeSelect } from './components/editor/background-shape-select'
import { BackgroundTypeSelect } from './components/editor/background-type-select'
import { EditingView } from './components/editor/editing-view'
import { AnswerZonesContext } from './context/context'
import { useAnswerZones } from './hooks/use-answer-zones'
import { DropzoneImageToolbar } from './toolbar'
import { BackgroundType, BackgroundShape, DropzoneVisibility } from './types'

export function DropzoneImageEditor(props: DropzoneImageProps) {
  const { state, id, focused } = props
  const {
    answerZones,
    backgroundImage,
    dropzoneVisibility,
    extraDraggableAnswers,
  } = state

  const isBackgroundImagePluginDefined = backgroundImage.defined

  const [previewActive, setPreviewActive] = useState(false)

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorDropzoneImageDocument
  )

  const {
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    selectAnswerZone,
    selectCurrentAnswer,
  } = useAnswerZones(answerZones)

  const backgroundType = state.backgroundType.value
  const isBackgroundTypeBlank = backgroundType === BackgroundType.Blank
  const isBackgroundTypeImage = backgroundType === BackgroundType.Image

  const canvasShape = state.canvasShape.value as BackgroundShape

  const hasBackgroundImageUrl = String(
    (staticDocument.state.backgroundImage as EditorImageDocument)?.state.src
  )
  const isBackgroundSelected =
    isBackgroundTypeBlank || (isBackgroundTypeImage && hasBackgroundImageUrl)

  // show image selection screen
  if (!isBackgroundSelected && isBackgroundImagePluginDefined) {
    return backgroundImage.render()
  }

  const showTypeSelect = backgroundType === ''
  const showShapeSelect = !canvasShape && isBackgroundTypeBlank

  return (
    <AnswerZonesContext.Provider
      value={{
        answerZones,
        canvasShape,
        currentAnswerZone,
        currentAnswerIndex,
        currentAnswerType,
        selectAnswerZone,
        selectCurrentAnswer,
        dropzoneVisibility: dropzoneVisibility.value as DropzoneVisibility,
        extraDraggableAnswers,
      }}
    >
      {focused ? (
        <DropzoneImageToolbar
          id={id}
          showSettings={!showTypeSelect && !showShapeSelect}
          showSettingsButton={isBackgroundTypeImage}
          backgroundImage={backgroundImage}
          dropzoneVisibility={dropzoneVisibility}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      ) : null}

      {showTypeSelect ? (
        <BackgroundTypeSelect {...props} />
      ) : showShapeSelect ? (
        <BackgroundShapeSelect {...props} />
      ) : (
        <EditingView
          {...props}
          previewActive={previewActive}
          staticDocument={staticDocument}
        />
      )}
    </AnswerZonesContext.Provider>
  )
}
