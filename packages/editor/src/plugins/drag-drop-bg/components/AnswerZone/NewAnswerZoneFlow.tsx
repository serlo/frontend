/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { faFont, faImage } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { answerZoneType } from '../../types.js'
import { FaIcon } from '@/components/fa-icon'

export interface NewAnswerZoneFormProps {
  newAnswerZone: answerZoneType
}

export function NewAnswerZoneFlow(props: NewAnswerZoneFormProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const { newAnswerZone } = props

  const [stepOneType, setStepOneType] = useState<'text' | 'image'>('image')

  const goToStepOne = (newStepOneType: 'text' | 'image') => {
    // eslint-disable-next-line no-console
    setStepOneType(newStepOneType)
    setCurrentStep(1)
  }

  const stepZero = (
    <div className="flex flex-row items-center justify-center">
      <button
        className="m-4 rounded bg-orange-100 px-4 py-2"
        onClick={() => {
          goToStepOne('text')
        }}
      >
        Text <FaIcon icon={faFont} />
      </button>
      <span>oder</span>
      <button
        className="m-4 rounded bg-orange-100 px-4 py-2"
        onClick={() => {
          goToStepOne('image')
        }}
      >
        Image <FaIcon icon={faImage} />
      </button>
    </div>
  )

  const stepOneText = <div>Text {newAnswerZone?.answer.text.render()}</div>

  // TODO: Image settings after image upload

  // TODO: Make add button work
  const stepOneImage = (
    <div>
      Image {newAnswerZone?.answer.image.render()}
      <div>
        <button className="mt-2 flex rounded bg-orange-100 px-2 py-1">
          {' '}
          + Ablageobject hinzufügen{' '}
        </button>
      </div>
    </div>
  )

  const stepOne = stepOneType === 'text' ? stepOneText : stepOneImage

  const stepTwo = <div>Step Two</div>

  const steps = [stepZero, stepOne, stepTwo]

  return steps[currentStep]
}
