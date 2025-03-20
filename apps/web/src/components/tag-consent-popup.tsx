import { GoogleTagManager } from '@next/third-parties/google'
import { useState } from 'react'

import { ModalWithCloseButton } from './modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'

export function TagConsentPopup() {
  const [consented, setConsented] = useState<undefined | boolean>(undefined)
  const { lang } = useInstanceData()
  const isDe = lang === 'de'

  const urlParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location.search)
      : undefined
  const hasUtm = Boolean(urlParams?.get('utm_source'))

  function removeQueryParams() {
    window.history.replaceState(null, '', window.location.pathname)
  }

  function handleAcceptClick() {
    removeQueryParams()
    setConsented(true)
    showToastNotice('Vielen Dank dir! 🍪', 'success')
  }

  function handleDenyClick() {
    removeQueryParams()
    setConsented(false)
  }

  if (!isDe || !hasUtm) return null

  return (
    <>
      {consented ? <GoogleTagManager gtmId="AW-994929012" /> : null}
      <ModalWithCloseButton
        title="Wir sammeln ausnahmsweiße Cookies 🍪"
        isOpen={consented === undefined}
        setIsOpen={handleDenyClick}
      >
        <div className="mb-24 max-h-[80vh] overflow-y-auto">
          <p className="serlo-p">
            Serlo.org findet Datenschutz super und wir bemühen uns nur die
            nötigsten Daten für eine gute Benutzung der Seite zu speichern.
            <br />
            Weil du über einen speziellen Werbelink von YouTube oder Google zu
            uns kommst würden wir gerne Cookies verwenden um diese Zugriffe zu
            analysieren.
            <br />
            <br />
            <a href="/consent" target="_blank" className="serlo-link">
              Jederzeit widerrufen
            </a>
            <br />
            <a href="/privacy" target="_blank" className="serlo-link">
              Datenschutzerklärung
            </a>
            {/* TODO: write text */}
          </p>
        </div>

        <div className="absolute bottom-12 left-0 right-0 mx-side flex items-center justify-between bg-white">
          <button
            className="serlo-button-learner-secondary"
            onClick={handleDenyClick}
          >
            Nur technisch notwendige
          </button>
          <button
            className="serlo-button-learner-primary ml-auto"
            onClick={handleAcceptClick}
          >
            Alle Akzeptieren
          </button>
        </div>
      </ModalWithCloseButton>
    </>
  )
}
