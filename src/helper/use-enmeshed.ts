import { useState } from 'react'

import { endpointEnmeshed } from '@/api/endpoint'

export interface EnmeshedErrorResponse {
  status: 'error'
  message: string
}

export interface EnmeshedPendingResponse {
  status: 'pending'
}

export interface EnmeshedSuccessResponse {
  status: 'success'
  attributes: EnmeshedAttributes
}

export type EnmeshedResponse =
  | EnmeshedErrorResponse
  | EnmeshedPendingResponse
  | EnmeshedSuccessResponse

export type EnmeshedAttributes = { name: string; value: string }[] | false

export function useEnmeshed(
  sessionId: string
): [EnmeshedAttributes, () => void, () => void] {
  const [data, setData] = useState<false | EnmeshedAttributes>(false)

  function fetchAPI() {
    fetch(`${endpointEnmeshed}/attributes?sessionId=${sessionId}`, {})
      .then((res) => res.json())
      .then((body: EnmeshedResponse) => {
        console.log(body)
        if (body.status === 'pending') {
          setTimeout(fetchAPI, 1000)
        }
        if (body.status === 'success') {
          setData(body.attributes)
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

  function writeAttribute() {
    fetch(
      `${endpointEnmeshed}/attributes?name=Lernstand-Mathe&value=huhu&sessionId=${sessionId}`,
      {}
    )
      .then((res) => res.json())
      .then((body) => {
        console.log(body)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))
        // triggerSentry({
        //   message: `${JSON.stringify(e)}`,
        // })
      })
  }

  return [data, fetchAPI, writeAttribute]
}
