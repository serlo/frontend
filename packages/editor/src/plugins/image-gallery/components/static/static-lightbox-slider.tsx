import { FaIcon } from '@editor/editor-ui/fa-icon'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'

interface StaticLightboxSliderProps {
  enabled: boolean
  onPrevious: () => void
  onNext: () => void
  children: JSX.Element
}

export function StaticLightboxSlider({
  enabled,
  onPrevious,
  onNext,
  children,
}: StaticLightboxSliderProps) {
  const previousButton = useRef<HTMLButtonElement>(null)
  const nextButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleDocumentKeyPress(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        onPrevious()
        previousButton.current?.focus()
      }
      if (event.key === 'ArrowRight') {
        onNext()
        nextButton.current?.focus()
      }
    }

    if (enabled) {
      document.addEventListener('keydown', handleDocumentKeyPress)
    } else {
      document.removeEventListener('keydown', handleDocumentKeyPress)
    }

    return () => document.removeEventListener('keydown', handleDocumentKeyPress)
  }, [enabled, onNext, onPrevious])

  return (
    <>
      <button
        ref={previousButton}
        className="flex p-1 text-gray-400 hover:text-gray-200 focus-visible:outline focus-visible:outline-gray-400"
        onClick={onPrevious}
      >
        <FaIcon className="text-4xl" icon={faChevronLeft} />
      </button>

      <div className="flex justify-center">{children}</div>

      <button
        ref={nextButton}
        className="flex p-1 text-gray-400 hover:text-gray-200 focus-visible:outline focus-visible:outline-gray-400"
        onClick={onNext}
      >
        <FaIcon className="text-4xl" icon={faChevronRight} />
      </button>
    </>
  )
}
