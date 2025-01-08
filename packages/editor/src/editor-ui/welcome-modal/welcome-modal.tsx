import { EditorModal } from '@editor/editor-ui/editor-modal'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
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

  return (
    <EditorModal
      // width should match slideWidth const
      className="top-1/2 flex w-[600px] max-w-[95%] flex-col gap-16 px-0 pt-20"
      extraTitleClassName="sr-only"
      title="Herzlich Willkommen beim Serlo Editor"
      isOpen={isOpen}
      setIsOpen={(isOpen) => !isOpen && onClose()}
    >
      <div className="flex h-[400px] overflow-hidden">
        <div
          className="flex items-center transition-transform"
          style={{
            transform: `translateX(${translateXValuesMap[currentStep]})`,
          }}
        >
          <div {...slideProps}>
            <h1 className="serlo-h1">
              Herzlich Willkommen! <br />
              <span className="text-brand-600">beim Serlo Editor</span>
            </h1>
            <p className="serlo-p">
              Der Serlo Editor hilft Dir <b>Texte, Bilder</b> und{' '}
              <b>interaktive Aufgaben</b> direkt zu bearbeiten und sofort zu
              sehen, wie sie später aussehen.
            </p>
            <p className="serlo-p">
              So kannst Du Lernmaterialien <b>einfach</b> erstellen,{' '}
              <b>ohne technische Vorkenntnisse</b> zu benötigen.
            </p>
          </div>

          <div {...slideProps}>
            <div className="px-4">
              <video controls>
                <source
                  src="https://storage.googleapis.com/assets.serlo.org/wikimedia/Der_Menstruationszyklus.webm"
                  type="video/webm"
                />
              </video>
            </div>
            <p className="serlo-p mb-0 mt-4">
              Weitere <b>Erklärungen und Videos</b> findest du jeweils in der
              Toolbar der einzelnen Plugins. Einfach auf das{' '}
              <FaIcon icon={faCircleQuestion} />
              &#8202;-Symbol klicken.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-8">
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
          {currentStep === steps.length ? "Los geht's!" : 'Weiter'}{' '}
          <FaIcon icon={faArrowCircleRight} />
        </button>
      </div>
    </EditorModal>
  )
}

const steps = [1, 2]

const slideWidth = 600

const slideProps = {
  style: { width: slideWidth },
  className: 'px-4',
}

const translateXValuesMap: Record<number, string> = {
  1: '0',
  2: `-${slideWidth}px`,
}
