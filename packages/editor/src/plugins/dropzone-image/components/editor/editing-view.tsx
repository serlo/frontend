import { EditorDropzoneImageDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { EditorCanvas } from './editor-canvas'
import { EditorCanvasModal } from './editor-canvas-modal'
import { ExtraIncorrectAnswers } from './extra-incorrect-answers'
import { PossibleAnswers } from './possible-answers'
import type { DropzoneImageProps } from '../..'
import { DropzoneImageStaticRenderer } from '../../static'
import { ModalType } from '../../types'

export function EditingView({
  state,
  previewActive,
  staticDocument,
}: {
  state: DropzoneImageProps['state']
  previewActive: boolean
  staticDocument: EditorDropzoneImageDocument
}) {
  const [modalType, setModalType] = useState<ModalType>(ModalType.Unset)

  if (previewActive) return <DropzoneImageStaticRenderer {...staticDocument} />

  const { answerZones, extraDraggableAnswers } = state

  return (
    <div className="mx-side">
      <EditorCanvasModal
        answerZones={answerZones}
        modalType={modalType}
        setModalType={setModalType}
      />
      <EditorCanvas state={state} setModalType={setModalType} />
      <PossibleAnswers answerZones={answerZones} />
      <ExtraIncorrectAnswers
        extraDraggableAnswers={extraDraggableAnswers}
        setModalType={setModalType}
      />
    </div>
  )
}
