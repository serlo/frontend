import { EditorDropzoneImageDocument } from '@editor/types/editor-plugins'
import { useState } from 'react'

import { EditorCanvas } from './editor-canvas'
import { EditorCanvasModal } from './editor-canvas-modal'
import { ExtraIncorrectAnswers } from './extra-incorrect-answers'
import { PossibleAnswers } from './possible-answers'
import type { DropzoneImageProps } from '../..'
import { useAnswerZones } from '../../hooks/use-answer-zones'
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
  const { answerZones, extraDraggableAnswers } = state

  const {
    currentAnswerZone,
    currentAnswerIndex,
    currentAnswerType,
    selectAnswerZone,
    selectCurrentAnswer,
  } = useAnswerZones(answerZones)

  if (previewActive) return <DropzoneImageStaticRenderer {...staticDocument} />

  return (
    <div className="mx-side">
      <EditorCanvasModal
        state={state}
        currentAnswer={{
          zone: currentAnswerZone,
          index: currentAnswerIndex,
          type: currentAnswerType,
        }}
        modalType={modalType}
        setModalType={setModalType}
      />
      <EditorCanvas
        state={state}
        setModalType={setModalType}
        selectCurrentAnswer={selectCurrentAnswer}
        selectAnswerZone={selectAnswerZone}
      />
      <PossibleAnswers answerZones={answerZones} />
      <ExtraIncorrectAnswers
        extraDraggableAnswers={extraDraggableAnswers}
        setModalType={setModalType}
      />
    </div>
  )
}
