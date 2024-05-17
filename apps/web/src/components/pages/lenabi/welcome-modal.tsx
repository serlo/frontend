import Head from 'next/head'
import { MouseEvent, useState } from 'react'

import { endpointEnmeshed } from '@/api/endpoint'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { triggerSentry } from '@/helper/trigger-sentry'

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

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault()
    setShowModal(true)
    fetchQRCode()
  }

  const handleMockLoad = () => {
    setTimeout(() => {
      setShowModal(false)
      callback()
    }, 500)
  }

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://assets.serlo.org/61bc977dedb38_daea31b3bd979c6587f874499713275b330db404.svg"
          as="image"
        />
        <link
          rel="preload"
          href="https://assets.serlo.org/61bcbbb4e9f58_99732b5cb071e233e2fabf9f37cd4a245936ad86.png"
          as="image"
        />
        <link
          rel="preload"
          href="https://assets.serlo.org/61bcbc3eef914_e5d5f432bbaeb48d2ed2075de1b7014444a798a9.png"
          as="image"
        />
        <link
          rel="preload"
          href="https://assets.serlo.org/61bcbcf057f40_9ee0d8d1f69f3ab74aaa825f622eb48ace01f623.png"
          as="image"
        />
        <link
          rel="preload"
          href="https://assets.serlo.org/61bcbdcc2ffaf_dc6a0dde8568432b86e76f1d52929402fad4451f.png"
          as="image"
        />
        <link
          rel="preload"
          href="https://assets.serlo.org/61bcb7b06f4a3_d36861e75a5d4c4695b21725fe9917e616771a11.svg"
          as="image"
        />
      </Head>
      <button
        className="serlo-button-green px-3 text-lg"
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
          Hier kannst du deinen Lernstand aus deiner Data-Wallet laden. Wenn du
          das noch nie gemacht hast, wir eine{' '}
          <a className="serlo-link" target="_blank" href="/wallet">
            ausführlichere Anleitung
          </a>{' '}
          für dich.
        </p>

        <b className="mx-side mt-4">QR-Code zum freischalten</b>
        {qrCodeSrc === '' ? (
          <div className="ml-1 pt-4">
            <LoadingSpinner noText />
          </div>
        ) : (
          <p className="img-wrapper mx-side mb-4 mt-4 h-48 w-48 rounded-xl bg-brand-100">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img src={qrCodeSrc} className="mix-blend-multiply" />
          </p>
        )}
        <p className="serlo-p">
          Nachdem du den Code mit der Wallet-App gescannt hast erscheint hier
          gleich dein Lernstand
          <button className="serlo-link" onClick={handleMockLoad}>
            .
          </button>
        </p>
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
        // When the workflow has been defined in the future we should revoke the object URL when done with:
        // urlCreator.revokeObjectUrl(qrCode)
      })
      .then(fetchAttributes)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))

        triggerSentry({
          message: `Error in User-Journey: Reading QR-Code: ${JSON.stringify(
            e
          )}`,
        })

        setShowModal(false)
        callback()
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
          setShowModal(false)
          callback()
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(`ERROR: ${JSON.stringify(e)}`)
        setShowModal(false)
        callback()
        triggerSentry({
          message: `Error in User-Journey: Reading Attributes: ${JSON.stringify(
            e
          )}`,
        })
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
