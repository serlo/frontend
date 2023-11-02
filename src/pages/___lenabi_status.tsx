import { faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'

import { endpointEnmeshed } from '@/api/endpoint'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { useCommentData } from '@/helper/use-comment-data'
import { theme } from '@/theme'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  const { commentData, error } = useCommentData(1565)

  const apiStatus = error
    ? false
    : commentData
    ? commentData.active?.length
      ? true
      : null
    : null

  const [enmeshedStatus, setEnmeshedStatus] = useState<null | true | false>(
    null
  )
  const [enmeshedQRStatus, setEnmeshedQRStatus] = useState<null | true | false>(
    null
  )
  const [keycloakStatus, setKeycloakStatus] = useState<null | true | false>(
    null
  )

  useEffect(() => {
    async function checkEnmeshedHealth() {
      let response = await fetch('https://enmeshed.serlo-staging.dev/health', {
        headers: { origin: '' },
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      response = await response.json()
      const success = (response &&
        hasOwnPropertyTs(response, 'isHealthy') &&
        response.isHealthy) as boolean
      setEnmeshedStatus(success)
    }

    async function checkKeycloak() {
      const response = await fetch('https://keycloak.serlo-staging.dev/')
      setKeycloakStatus(response.status === 200)
    }

    async function checkEnmeshedQRStatus() {
      fetch(`${endpointEnmeshed}/init?sessionId=testsession&name=Test%20Name`, {
        method: 'POST',
        headers: {
          Accept: 'image/png',
        },
      })
        .then((res) => res.blob())
        .then(() => {
          setEnmeshedQRStatus(true)
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(e))
          setEnmeshedQRStatus(false)
        })
    }

    void checkEnmeshedQRStatus()
    void checkEnmeshedHealth()
    void checkKeycloak()
  }, [])

  return (
    <>
      <PageTitle title="Status Check" headTitle />

      <p className="serlo-p text-2xl">
        Serlo Frontend: {renderStatus(true)} <br />
        Serlo API: {renderStatus(apiStatus)} <br />
        Serlo Enmeshed (2): {renderStatus(enmeshedStatus)}{' '}
        {renderStatus(enmeshedQRStatus)} <br />
        Serlo Keycloak: {renderStatus(keycloakStatus)} <br />
      </p>

      <p className="serlo-p pt-10">
        Wenn einer dieser Checks fehlschlägt oder sehr lange braucht,
        <br /> solltet ihr lieber das Video abspielen.
        <br />
        Sonst schaut zumindest auf Serlo Seite alles gut aus. <br />
        Viel Erfolg! 👍
      </p>
    </>
  )

  function renderStatus(status: boolean | null) {
    if (status === null) return <FontAwesomeIcon icon={faSpinner} spin />
    if (status)
      return <FontAwesomeIcon icon={faCheck} color={theme.colors.brandGreen} />
    return <FontAwesomeIcon icon={faTimes} color="#ff0000" />
  }
}
