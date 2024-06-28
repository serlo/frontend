import IconAnswerImage from '@editor/editor-ui/assets/plugin-icons/dropzone-image/answer-image.svg'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AnswerRenderer } from './answer-renderer'
import { AnswerZonesContext } from '../../context/context'
import { AnswerType } from '../../types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface NewAnswerFlowProps {
  isWrongAnswer?: boolean
  zoneId?: string
}

/**
 *
 * This component handles the flow for creating a new answer zone or a wrong answer.
 * It guides the user through selecting either text or image and configuring the answer.
 *
 */
export function NewAnswerFlow(props: NewAnswerFlowProps) {
  const { isWrongAnswer = false, zoneId } = props
  const [currentStep, setCurrentStep] = useState(0)
  const [stepOneType, setStepOneType] = useState<AnswerType>(AnswerType.Image)

  const editorPluginsStrings = useEditorStrings().plugins

  const { answerZones, extraDraggableAnswers } =
    useContext(AnswerZonesContext) || {}

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : (answerZones?.find(({ id }) => id.get() === zoneId)
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
    <>
      <AnswerRenderer
        answerType={stepOneType}
        answerIndex={answersList.length - 1}
        isWrongAnswer={isWrongAnswer}
        zoneId={zoneId}
      />
      <button className="serlo-button-editor-primary mt-4">
        {editorPluginsStrings.dropzoneImage.modal.save}
      </button>
    </>
  )

  const steps = [stepZero, stepOne]

  return steps[currentStep]
}
