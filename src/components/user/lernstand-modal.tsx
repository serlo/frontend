import { MouseEvent, useState } from 'react'

import { ModalWithCloseButton } from '../modal-with-close-button'
import { createQRCode } from '../pages/data-wallet'
import { LoadingSpinner } from '@/components/loading/loading-spinner'

export function LernstandModal({ callback }: { callback: () => void }) {
  const [showModal, setShowModal] = useState(false)
  const [qrCode, setQrCode] = useState('')

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    setShowModal(true)
    createQRCode(setQrCode)
  }

  const handleMockLoad = () => {
    setTimeout(() => {
      setShowModal(false)
      callback()
    }, 5000)
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
          {qrCode &&
            ((qrCode === 'loading' && (
              <div className="ml-1 pt-4">
                <LoadingSpinner noText />
              </div>
            )) || <img src={qrCode} />)}
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
        <style jsx>{`
          img {
            mix-blend-mode: multiply;
          }
        `}</style>
      </ModalWithCloseButton>
    </>
  )
}
