import { useState } from 'react'

import { ModalWithCloseButton } from './modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { showToastNotice } from '@/helper/show-toast-notice'
import { ExternalProvider, useConsent } from '@/helper/use-consent'

const alreadyAskedKey = 'tagConsentAlreadyAsked'

export function TagConsentPopup() {
  const [refreshCount, setRefreshCount] = useState(0)
  const { lang } = useInstanceData()
  const isDe = lang === 'de'
  const { checkConsent, giveConsent } = useConsent()
  const urlParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location.search)
      : undefined
  const hasUtm = Boolean(urlParams?.get('utm_source'))
  const hasTagConsent = checkConsent(ExternalProvider.GoogleTagManager)

  const alreadyAsked =
    typeof window !== 'undefined'
      ? localStorage.getItem(alreadyAskedKey) === '1'
      : false

  const showModal = hasUtm && !hasTagConsent && !alreadyAsked

  function handleAcceptClick() {
    giveConsent(ExternalProvider.GoogleTagManager)
    localStorage.setItem(alreadyAskedKey, '1')
    setRefreshCount(refreshCount + 1)
    showToastNotice('Vielen Dank dir! 🍪', 'success')
  }

  function handleDenyClick() {
    localStorage.setItem(alreadyAskedKey, '1')
    setRefreshCount(refreshCount + 1)
  }

  if (!isDe) return null
  if (!showModal) return null

  return (
    <ModalWithCloseButton
      title="Wir sammeln ausnahmsweiße Cookies 🍪"
      isOpen
      setIsOpen={handleDenyClick}
    >
      <div className="mb-24 max-h-[80vh] overflow-y-auto">
        <p className="serlo-p">
          Serlo.org findet Datenschutz super und wir bemühen uns nur die
          nötigsten Daten für eine gute Benutzung der Seite zu speichern.
          <br />
          Weil du über einen speziellen Werbelink von YouTube oder Google zu uns
          kommst würden wir gerne Cookies verwenden um diese Zugriffe zu
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
  )
}
