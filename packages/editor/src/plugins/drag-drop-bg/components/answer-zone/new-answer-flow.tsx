import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faFont, faImage } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AnswerRenderer } from './answer-renderer'
import { AnswerZonesContext } from '../../context/context'
import { FaIcon } from '@/components/fa-icon'

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
export function NewAnswerFlow({
  isWrongAnswer = false,
  zoneId,
}: NewAnswerFlowProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepOneType, setStepOneType] = useState<'text' | 'image'>('image')

  const { zones, extraDraggableAnswers } = useContext(AnswerZonesContext) || {}

  const answersList = isWrongAnswer
    ? extraDraggableAnswers
    : zones?.find((z) => z.id.get() === zoneId)?.answers

  const goToStepOne = (newStepOneType: 'text' | 'image') => {
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
        className="m-4 rounded bg-orange-100 px-4 py-2"
        onClick={() => goToStepOne('text')}
      >
        Text <FaIcon icon={faFont} />
      </button>
      <span>oder</span>
      <button
        className="m-4 rounded bg-orange-100 px-4 py-2"
        onClick={() => goToStepOne('image')}
      >
        Image <FaIcon icon={faImage} />
      </button>
    </div>
  )

  const stepOne = answersList ? (
    <AnswerRenderer
      answerType={stepOneType}
      answerIndex={answersList.length - 1}
      isWrongAnswer={isWrongAnswer}
      zoneId={zoneId}
    />
  ) : (
    <>Error </>
  )

  const stepTwo = <div>Step Two</div>

  const steps = [stepZero, stepOne, stepTwo]

  return steps[currentStep]
}
