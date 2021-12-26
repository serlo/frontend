import { useState } from 'react'

import { triggerSentry } from './trigger-sentry'
import { endpointEnmeshed } from '@/api/endpoint'

export function useEnmeshedQR(sessionId: string): [string, () => void] {
  const [src, setSrc] = useState('')

  //TODO: get name and session id from user

  function createQRCode() {
    fetch(
      `${endpointEnmeshed}/init?sessionId=${sessionId}&familyName=Willer&givenName=Botho`,
      {
        method: 'POST',
        headers: {
          Accept: 'image/png',
        },
      }
    )
      .then((res) => res.blob())
      .then((res) => {
        const urlCreator = window.URL || window.webkitURL
        setSrc(urlCreator.createObjectURL(res))
        // TODO: When the workflow has been defined in the future we should revoke the object URL when done with:
        // urlCreator.revokeObjectUrl(qrCode)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))

        triggerSentry({
          message: `error while creating qr code: ${JSON.stringify(e)}`,
        })
      })
  }
  return [src, createQRCode]
}
