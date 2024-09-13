import { ImageProps } from '@editor/plugins/image'
import {
  runChangeDocumentSaga,
  selectDocument,
  selectStaticDocument,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'
import { useCallback, useState } from 'react'

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

  const dispatch = useAppDispatch()

  const isBackgroundImagePluginDefined = backgroundImage.defined

  const [previewActive, setPreviewActive] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(ModalType.Unset)

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorDropzoneImageDocument
  )
  const backgroundImagePluginState = useAppSelector((state) =>
    selectDocument(
      state,
      isBackgroundImagePluginDefined ? backgroundImage.id : null
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
    duplicateAnswerZone,
  } = useAnswerZones(answerZones)

  const handleChangeImageButtonClick = useCallback(() => {
    if (!backgroundImage.defined) return

    dispatch(
      runChangeDocumentSaga({
        id: backgroundImage.id,
        state: { initial: (curr) => ({ ...(curr as object), src: '' }) },
      })
    )
    // TODO: reset dropzone aspect ratio
  }, [backgroundImage, dispatch])

  const backgroundType = state.backgroundType.value
  const isBackgroundTypeBlank = backgroundType === BackgroundType.Blank
  const isBackgroundTypeImage = backgroundType === BackgroundType.Image

  if (backgroundType === '') return <BackgroundTypeSelect {...props} />

  const canvasShape = state.canvasShape.value as BackgroundShape

  if (!canvasShape && isBackgroundTypeBlank) {
    return <BackgroundShapeSelect {...props} />
  }

  const hasBackgroundImageUrl = !!backgroundImageUrlFromPlugin
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
          onChangeImageButtonClick={handleChangeImageButtonClick}
          showSettingsButton={isBackgroundTypeImage}
          backgroundImageState={{
            id: isBackgroundImagePluginDefined ? backgroundImage.id : null,
            state: backgroundImagePluginState?.state as unknown as
              | ImageProps['state']
              | undefined,
          }}
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
