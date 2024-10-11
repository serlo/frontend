import { selectStaticDocument, useAppSelector } from '@editor/store'
import type {
  EditorDropzoneImageDocument,
  EditorImageDocument,
} from '@editor/types/editor-plugins'

import type { DropzoneImageProps } from '.'
import { BackgroundShapeSelect } from './components/editor/background-shape-select'
import { BackgroundTypeSelect } from './components/editor/background-type-select'
import { EditingView } from './components/editor/editing-view'
import { DropzoneImageToolbar } from './toolbar'
import { BackgroundType } from './types'
import { useIsPreviewActive } from '../exercise/context/preview-context'

export function DropzoneImageEditor({
  state,
  id,
  containerRef,
}: DropzoneImageProps) {
  const { backgroundImage, dropzoneVisibility } = state

  const previewActive = useIsPreviewActive()

  const staticDocument = useAppSelector(
    (storeState) =>
      selectStaticDocument(storeState, id) as EditorDropzoneImageDocument
  )
  const staticImage = staticDocument.state
    .backgroundImage as EditorImageDocument
  const hasBackgroundImageUrl = !!staticImage?.state.src

  const { backgroundType, canvasShape } = state

  const isBackgroundTypeBlank = backgroundType.value === BackgroundType.Blank
  const isBackgroundTypeImage = backgroundType.value === BackgroundType.Image

  const isBackgroundSelected =
    isBackgroundTypeBlank || (isBackgroundTypeImage && hasBackgroundImageUrl)

  // show image selection screen
  if (!isBackgroundSelected && backgroundImage.defined) {
    return backgroundImage.render()
  }

  const showTypeSelect = backgroundType.value === ''
  const showShapeSelect = !canvasShape.value && isBackgroundTypeBlank

  return (
    <>
      <DropzoneImageToolbar
        showSettings={!showTypeSelect && !showShapeSelect}
        showSettingsButton={isBackgroundTypeImage}
        backgroundImage={backgroundImage}
        dropzoneVisibility={dropzoneVisibility}
        containerRef={containerRef}
      />

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
    </>
  )
}
