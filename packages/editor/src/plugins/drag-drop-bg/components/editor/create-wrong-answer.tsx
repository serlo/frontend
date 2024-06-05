import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faFont, faImage } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'

import { AnswerZonesContext } from '../../context/context'
import { FaIcon } from '@/components/fa-icon'

/**
 *
 * This component handles the flow for creating a wrong answer.
 *
 */
export function NewWrongAnswer(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepOneType, setStepOneType] = useState<'text' | 'image'>('image')

  const { extraDraggableAnswers } = useContext(AnswerZonesContext) || {}

  const goToStepOne = (newStepOneType: 'text' | 'image') => {
    extraDraggableAnswers.insert(extraDraggableAnswers.length, {
      text: { plugin: EditorPluginType.Text },
      image: { plugin: EditorPluginType.Image },
    })
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

  const stepOneText = (
    <div>
      {extraDraggableAnswers[extraDraggableAnswers.length - 1]?.text.render()}
    </div>
  )

  const stepOneImage = (
    <div>
      {extraDraggableAnswers[extraDraggableAnswers.length - 1]?.image.render()}
      <div>
        <button className="mt-2 flex rounded bg-orange-100 px-2 py-1">
          + Ablageobject hinzufügen
        </button>
      </div>
    </div>
  )

  const stepOne = stepOneType === 'text' ? stepOneText : stepOneImage
  const stepTwo = <div>Step Two</div>

  const steps = [stepZero, stepOne, stepTwo]

  return steps[currentStep]
}
