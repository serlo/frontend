import { selectStaticDocument, useAppSelector } from '@editor/store'
import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { useState } from 'react'

import type { DropzoneImageProps } from '.'
import { BackgroundShapeSelect } from './components/editor/background-shape-select'
import { BackgroundTypeSelect } from './components/editor/background-type-select'
import { EditorCanvas } from './components/editor/editor-canvas'
import { EditorCanvasModal } from './components/editor/editor-canvas-modal'
import { ExtraIncorrectAnswers } from './components/editor/extra-incorrect-answers'
import { PossibleAnswers } from './components/editor/possible-answers'
import { AnswerZonesContext } from './context/context'
import { useAnswerZones } from './hooks/use-answer-zones'
import { DropzoneImageStaticRenderer } from './static'
import { DropzoneImageToolbar } from './toolbar'
import {
  BackgroundType,
  BackgroundShape,
  DropzoneVisibility,
  ModalType,
} from './types'

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
  const [modalType, setModalType] = useState<ModalType>(ModalType.Unset)

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
    insertAnswerZone,
    duplicateAnswerZone,
  } = useAnswerZones(answerZones)

  const backgroundType = state.backgroundType.value
  const isBackgroundTypeBlank = backgroundType === BackgroundType.Blank
  const isBackgroundTypeImage = backgroundType === BackgroundType.Image

  if (backgroundType === '') return <BackgroundTypeSelect {...props} />

  const canvasShape = state.canvasShape.value as BackgroundShape

  if (!canvasShape && isBackgroundTypeBlank) {
    return <BackgroundShapeSelect {...props} />
  }

  const hasBackgroundImageUrl = String(
    (staticDocument.state.backgroundImage as EditorImageDocument)?.state.src
  )
  const isBackgroundSelected =
    isBackgroundTypeBlank || (isBackgroundTypeImage && hasBackgroundImageUrl)

  // show image selection screen
  if (!isBackgroundSelected && isBackgroundImagePluginDefined) {
    return backgroundImage.render()
  }

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
      {focused && (
        <DropzoneImageToolbar
          id={id}
          showSettingsButton={isBackgroundTypeImage}
          backgroundImage={backgroundImage}
          dropzoneVisibility={dropzoneVisibility}
          previewActive={previewActive}
          setPreviewActive={setPreviewActive}
        />
      )}
      {previewActive ? (
        <DropzoneImageStaticRenderer {...staticDocument} />
      ) : (
        <div className="mx-side">
          <EditorCanvasModal
            answerZones={answerZones}
            modalType={modalType}
            duplicateAnswerZone={duplicateAnswerZone}
            setModalType={setModalType}
          />
          <EditorCanvas state={state} setModalType={setModalType} />
          <PossibleAnswers
            answerZones={answerZones}
            onClickAddAnswerZone={insertAnswerZone}
          />
          <ExtraIncorrectAnswers
            extraDraggableAnswers={extraDraggableAnswers}
            setModalType={setModalType}
          />
        </div>
      )}
    </AnswerZonesContext.Provider>
  )
}
