/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { faFont, faImage } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import type { answerZoneType } from '../../types'
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
  const btnStyle = {
    padding: '10px',
    paddingRight: '20px',
    backgroundColor: '#ffedd5',
    margin: '20px',
    borderRadius: '5px',
  }

  const stepZero = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        style={btnStyle}
        onClick={() => {
          goToStepOne('text')
        }}
      >
        Text <FaIcon icon={faFont} />
      </button>
      <span>oder</span>
      <button
        style={btnStyle}
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

  const addButtonStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: '#ffedd5', // Light orange background
    borderRadius: '5px', // Rounded corners
    padding: '5px 10px 5px 10px',
  }

  // TODO: Make add button work
  const stepOneImage = (
    <div>
      Image {newAnswerZone?.answer.image.render()}
      <div>
        <button style={addButtonStyle}> + Ablageobject hinzufügen </button>
      </div>
    </div>
  )

  const stepOne = stepOneType === 'text' ? stepOneText : stepOneImage

  const stepTwo = <div>Step Two</div>

  const steps = [stepZero, stepOne, stepTwo]

  return steps[currentStep]
}
