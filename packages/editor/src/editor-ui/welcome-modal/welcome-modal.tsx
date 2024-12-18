import { EditorModal } from '@editor/editor-ui/editor-modal'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { FaIcon } from '../fa-icon'
import { useWelcomeModal } from './use-welcome-modal'
import { WelcomeModalButton } from './welcome-modal-button'

export function WelcomeModal() {
  const { isOpen, onClose } = useWelcomeModal()
  const [currentStep, setCurrentStep] = useState(1)

  function handleNextButtonClick() {
    setCurrentStep((previousValue) => {
      if (previousValue < steps.length) return previousValue + 1
      return onClose() ?? 1
    })
  }

  // TODO: Placeholder strings until final strings are provided
  const welcomeModalStrings = {
    title: 'Welcome',
    firstStepText:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thirdStepText:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    nextButton: 'Next',
    nextButtonLastStep: "Let's go!",
  }

  return (
    <EditorModal
      // width should match slideWidth const
      className="top-1/2 flex w-[700px] max-w-[95%] flex-col gap-16 px-0 pt-20"
      extraTitleClassName="sr-only"
      title={welcomeModalStrings.title}
      isOpen={isOpen}
      setIsOpen={(isOpen) => !isOpen && onClose()}
    >
      <div className="flex h-[350px] overflow-hidden">
        <div
          className="flex items-center transition-transform"
          style={{
            transform: `translateX(${translateXValuesMap[currentStep]})`,
          }}
        >
          <div {...slideProps}>
            <h1 className="serlo-h1">
              {welcomeModalStrings.title}{' '}
              <span className="text-brand-600">Serlo Editor</span>
            </h1>
            <p className="serlo-p">{welcomeModalStrings.firstStepText}</p>
          </div>

          <div {...slideProps}>
            <h1 className="serlo-h1">Video</h1>
          </div>

          <div {...slideProps}>
            <p className="serlo-p">{welcomeModalStrings.thirdStepText}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1">
          {steps.map((step) => (
            <WelcomeModalButton
              key={step}
              isActive={step === currentStep}
              onClick={() => setCurrentStep(step)}
            />
          ))}
        </div>
        <button
          className="serlo-button-learner-primary"
          onClick={handleNextButtonClick}
        >
          {currentStep === 3
            ? welcomeModalStrings.nextButtonLastStep
            : welcomeModalStrings.nextButton}{' '}
          <FaIcon icon={faArrowCircleRight} />
        </button>
      </div>
    </EditorModal>
  )
}

const steps = [1, 2, 3]

const slideWidth = 700

const slideProps = {
  style: { width: slideWidth },
  className: 'px-4',
}

const translateXValuesMap: Record<number, string> = {
  1: '0',
  2: `-${slideWidth}px`,
  3: `-${slideWidth * 2}px`,
}
