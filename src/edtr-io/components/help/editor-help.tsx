import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function EditorHelp() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open ? null : (
        <nav className="absolute z-50 right-8 bottom-8 h-full flex items-end pointer-events-none">
          <button
            onClick={() => {
              setOpen(true)
            }}
            className="sticky bottom-8 serlo-button-editor-transparent p-2 pointer-events-auto"
          >
            <FaIcon icon={faQuestionCircle} className="text-3xl" />
            <span className="sr-only">Help</span>
          </button>
        </nav>
      )}

      <ModalWithCloseButton
        isOpen={open}
        onCloseClick={() => {
          setOpen(false)
        }}
        className="!right-0 !left-auto !bg-gray !top-0 !bottom-0 !h-screen !rounded-none !m-0 !w-[400px] !translate-x-0 !translate-y-0 overflow-y-auto !max-h-[none]"
      >
        <div>
          <iframe
            src="https://de.serlo.org/content-only/90231"
            className="w-[95%] mx-side mt-[5vh] h-[95vh] max-h-[750px] bg-gray-50"
          />
        </div>
      </ModalWithCloseButton>
    </>
  )
}
