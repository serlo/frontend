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
import { DropzoneImageToolbar } from './toolbar'
import { BackgroundType, DropzoneVisibility } from './types'

export function DropzoneImageEditor({
  state,
  id,
  focused,
}: DropzoneImageProps) {
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

  const backgroundType = state.backgroundType.value
  const isBackgroundTypeBlank = backgroundType === BackgroundType.Blank
  const isBackgroundTypeImage = backgroundType === BackgroundType.Image

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
  const showShapeSelect = !state.canvasShape.value && isBackgroundTypeBlank

  return (
    <AnswerZonesContext.Provider
      value={{
        answerZones,
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
        <BackgroundTypeSelect {...state} />
      ) : showShapeSelect ? (
        <BackgroundShapeSelect {...state} />
      ) : (
        <EditingView
          state={state}
          previewActive={previewActive}
          staticDocument={staticDocument}
        />
      )}
    </AnswerZonesContext.Provider>
  )
}
