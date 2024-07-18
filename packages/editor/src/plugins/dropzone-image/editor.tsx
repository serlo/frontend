import { PreviewButton, ToolbarSelect } from '@editor/editor-ui/plugin-toolbar'
import { ImageProps } from '@editor/plugins/image'
import {
  selectDocument,
  selectStaticDocument,
  useAppSelector,
} from '@editor/store'
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
import { useEditorStrings } from '@/contexts/logged-in-data-context'

export function DropzoneImageEditor(props: DropzoneImageProps) {
  const { state, id, focused } = props
  const {
    answerZones,
    backgroundImage,
    dropzoneVisibility,
    extraDraggableAnswers,
  } = state

  const pluginStrings = useEditorStrings().plugins.dropzoneImage

  const visibilityOptions = Object.values(pluginStrings.visibilityOptions)

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
    duplicateAnswerZone,
  } = useAnswerZones(answerZones)

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
        dropzoneVisibility: dropzoneVisibility.get() as DropzoneVisibility,
        extraDraggableAnswers,
      }}
    >
      {focused && (
        <DropzoneImageToolbar
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
            tooltipText={pluginStrings.dropzoneVisibility}
            value={dropzoneVisibility.value}
            changeValue={(value) => dropzoneVisibility.set(value)}
            options={visibilityOptions.map((option) => ({
              text: option.charAt(0).toUpperCase() + option.slice(1),
              value: option,
            }))}
          />
        </DropzoneImageToolbar>
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
