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
        className="top-8 max-h-[90vh] translate-y-0 overflow-y-auto"
      >
        <div>
          <p className="serlo-p">
            Serlo.org findet Datenschutz super und wir bemühen uns nur die
            nötigsten Daten für eine gute Benutzung der Seite zu speichern.
            <br />
            <br />
            Weil du über einen{' '}
            <b>speziellen Werbelink von YouTube oder Google</b> zu uns kommst
            würden wir gerne besser verstehen, was du auf unserer Seite machst,
            damit wir unsere Service verbessern können.{' '}
            <b>Dürfen wir dafür Cookies in deinen Browser ablegen?</b>
            <br />
            <br />
            Deine Zustimmung gilt nur für diesen Besuch. Du kannst deine
            Zustimmung jede Zeit wiederrufen in dem du die Seite neu lädst. Bei
            deinem nächsten Besuch ist deine Zustimmung automatisch
            zurückgezogen. Was mit deinen Daten passiert, steht in unserer{' '}
            <a href="/privacy" target="_blank" className="serlo-link">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>

        <div className="mx-side mb-2 flex items-center justify-between gap-x-3">
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
