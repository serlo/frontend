import { MouseEvent, useState } from 'react'

import { ModalWithCloseButton } from '../modal-with-close-button'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useEnmeshed } from '@/helper/use-enmeshed'
import { useEnmeshedQR } from '@/helper/use-enmeshed-qr'

const sessionStorageKey = 'session-id-enmeshed'

function getSessionId() {
  if (typeof window === 'undefined') return 'foo'

  const stored = sessionStorage.getItem(sessionStorageKey)
  if (stored) return stored

  const newId = (Math.random() + 1).toString(36).substr(2, 13) //random string

  sessionStorage.setItem(sessionStorageKey, newId)
  return newId
}

export function WelcomeModal({ callback }: { callback: () => void }) {
  const [showModal, setShowModal] = useState(false)

  const sessionId = getSessionId()

  const [qrCodeSrc, getQrCode] = useEnmeshedQR(sessionId)
  const [enmeshedAttributes, queryAttributes, writeAttribute] =
    useEnmeshed(sessionId)

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    setShowModal(true)
    getQrCode()
  }

  const handleMockLoad = () => {
    setTimeout(() => {
      setShowModal(false)
      // eslint-disable-next-line no-console
      console.log(enmeshedAttributes)
      callback()
    }, 500)
  }

  return (
    <>
      <button
        className="serlo-button serlo-make-interactive-green"
        onClick={handleOnClick}
      >
        Zugriff auf Data-Wallet einrichten
      </button>
      <ModalWithCloseButton
        isOpen={showModal}
        onCloseClick={() => setShowModal(false)}
        title="Eigenen Lernstand laden"
      >
        <p className="serlo-p">
          Hier kannst du deinen Lernstand aus deiner{' '}
          <a className="serlo-link" href="/wallet" target="_blank">
            BIRD Data-Wallet
          </a>{' '}
          laden. Wenn du das noch nie gemacht hast, wir eine{' '}
          <a className="serlo-link" target="_blank" href="/wallet">
            ausführlichere Anleitung
          </a>{' '}
          für dich.
        </p>

        <b className="mt-4 mx-side">QR-Code zum freischalten</b>
        <p className="mx-side bg-brand-100 img-wrapper rounded-xl mt-4 mb-4 w-48 h-48">
          {qrCodeSrc === '' ? (
            <div className="ml-1 pt-4">
              <LoadingSpinner noText />
            </div>
          ) : (
            <img src={qrCodeSrc} />
          )}
        </p>
        <p className="serlo-p">
          Nachdem du den Code mit der{' '}
          <a className="serlo-link" target="_blank" href="/wallet">
            Enmeshed
          </a>{' '}
          App gescannt hast erscheint hier gleich dein Lernstand
          <button className="serlo-link" onClick={handleMockLoad}>
            .
          </button>
        </p>
        <p className="serlo-p">
          <button
            className="serlo-button serlo-make-interactive-light"
            onClick={queryAttributes}
          >
            Query Data
          </button>
          <button
            className="serlo-button serlo-make-interactive-light"
            onClick={writeAttribute}
          >
            Write Data
          </button>
        </p>
        <style jsx>{`
          img {
            mix-blend-mode: multiply;
          }
        `}</style>
      </ModalWithCloseButton>
    </>
  )
}
