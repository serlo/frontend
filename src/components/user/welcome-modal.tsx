import { MouseEvent, useState } from 'react'

import { ModalWithCloseButton } from '../modal-with-close-button'
import { endpointEnmeshed } from '@/api/endpoint'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { triggerSentry } from '@/helper/trigger-sentry'
import { useEnmeshed } from '@/helper/use-enmeshed'

export function WelcomeModal({
  callback,
  username,
  sessionId,
}: {
  callback: () => void
  username: string
  sessionId: string
}) {
  const [showModal, setShowModal] = useState(false)

  const [qrCodeSrc, setQrCodeSrc] = useState('')
  const [enmeshedAttributes, queryAttributes, writeAttribute] =
    useEnmeshed(sessionId)

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    setShowModal(true)
    fetchQRCode()
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
        <style jsx>{`
          img {
            mix-blend-mode: multiply;
          }
        `}</style>
      </ModalWithCloseButton>
    </>
  )

  function fetchQRCode() {
    const name = encodeURIComponent(username)

    fetch(`${endpointEnmeshed}/init?sessionId=${sessionId}&name=${name}`, {
      method: 'POST',
      headers: {
        Accept: 'image/png',
      },
    })
      .then((res) => res.blob())
      .then((res) => {
        const urlCreator = window.URL || window.webkitURL
        setQrCodeSrc(urlCreator.createObjectURL(res))
        // TODO: When the workflow has been defined in the future we should revoke the object URL when done with:
        // urlCreator.revokeObjectUrl(qrCode)
      })
      .then(fetchAttributes)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))

        triggerSentry({
          message: `error while creating qr code: ${JSON.stringify(e)}`,
        })
      })
  }

  function fetchAttributes() {
    fetch(`${endpointEnmeshed}/attributes?sessionId=${sessionId}`, {})
      .then((res) => res.json())
      .then((body: EnmeshedResponse) => {
        if (body.status === 'pending') {
          // eslint-disable-next-line no-console
          console.log('INFO: RelationshipRequest is pending...')
          setTimeout(fetchAttributes, 1000)
        }
        if (body.status === 'success') {
          // eslint-disable-next-line no-console
          console.log('INFO: RelationshipRequest was accepted.')
          // eslint-disable-next-line no-console
          console.log(
            `INFO: Value of Lernstand-Mathe is "${body.attributes['Lernstand-Mathe']}"`
          )
          setShowModal(false)
          callback()
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))
        // triggerSentry({
        //   message: `${JSON.stringify(e)}`,
        // })
      })
  }
}

export type EnmeshedResponse =
  | EnmeshedErrorResponse
  | EnmeshedPendingResponse
  | EnmeshedSuccessResponse

export interface EnmeshedErrorResponse {
  status: 'error'
  message: string
}

export interface EnmeshedPendingResponse {
  status: 'pending'
}

export interface EnmeshedSuccessResponse {
  status: 'success'
  attributes: Record<string, string>
}
