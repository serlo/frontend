import IconAnswerImage from '@editor/editor-ui/assets/plugin-icons/dropzone-image/answer-image.svg'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AnswerRenderer } from './answer-renderer'
import type { DropzoneImageProps } from '../..'
import { AnswerType } from '../../types'

interface NewAnswerFlowProps {
  isWrongAnswer?: boolean
  zoneId?: string
  onSave: () => void
  answerZones: DropzoneImageProps['state']['answerZones']
  extraDraggableAnswers: DropzoneImageProps['state']['extraDraggableAnswers']
}

/**
 *
 * This component handles the flow for creating a new answer zone or a wrong answer.
 * It guides the user through selecting either text or image and configuring the answer.
 *
 */
export function NewAnswerFlow({
  isWrongAnswer = false,
  zoneId,
  onSave,
  answerZones,
  extraDraggableAnswers,
}: NewAnswerFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepOneType, setStepOneType] = useState<AnswerType>(AnswerType.Image)

  const editorPluginsStrings = useEditStrings().plugins

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : (answerZones?.find(({ id }) => id.value === zoneId)
        ?.answers as typeof extraDraggableAnswers)

  const goToStepOne = (newStepOneType: AnswerType) => {
    if (answersList) {
      answersList.insert(answersList.length, {
        id: uuidv4(),
        text: { plugin: EditorPluginType.Text },
        image: { plugin: EditorPluginType.Image },
      })
    }
    setStepOneType(newStepOneType)
    setCurrentStep(1)
  }

  const stepZero = (
    <div className="flex flex-row items-center justify-center">
      <button
        data-qa="plugin-dropzone-image-answer-zone-new-answer-type-text"
        className="mx-4 rounded-lg bg-orange-100 p-4 hover:bg-orange-200"
        onClick={() => goToStepOne(AnswerType.Text)}
      >
        <div className="border border-2 border-black px-1 text-lg font-bold">
          {editorPluginsStrings.text.title}...
        </div>
      </button>
      <span>{editorPluginsStrings.dropzoneImage.or}</span>
      <button
        data-qa="plugin-dropzone-image-answer-zone-new-answer-type-image"
        className="mx-4 rounded-lg bg-orange-100 px-4 pb-2 pt-4 hover:bg-orange-200"
        onClick={() => goToStepOne(AnswerType.Image)}
      >
        <IconAnswerImage className="mx-auto mb-1" />
        <span className="text-lg font-bold">
          {editorPluginsStrings.image.title}
        </span>
      </button>
    </div>
  )

  const stepOne = (
    <AnswerRenderer
      answerType={stepOneType}
      answerIndex={answersList.length - 1}
      isWrongAnswer={isWrongAnswer}
      zoneId={zoneId}
      onSave={onSave}
      answerZones={answerZones}
      extraDraggableAnswers={extraDraggableAnswers}
    />
  )

  const steps = [stepZero, stepOne]

  return steps[currentStep]
}
