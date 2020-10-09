import React from 'react'
import styled from 'styled-components'

import { serloDomain } from '../../helper/serlo-domain'
import { useInstanceData } from '@/contexts/instance-context'
import { useOrigin } from '@/contexts/origin-context'

interface LocalStorageData {
  revision: string
  showEvent: boolean
  consentEvent: boolean
}

export function CookieBar() {
  const [show, setShow] = React.useState(false)
  const [revision, setRevision] = React.useState<undefined | string>(undefined)
  const origin = useOrigin()
  const { strings } = useInstanceData()

  React.useEffect(() => {
    try {
      const localInfoString = localStorage.getItem('consent')
      const localInfo = localInfoString
        ? (JSON.parse(localInfoString) as LocalStorageData)
        : null
      const sessionCacheString = sessionStorage.getItem(
        'privacy_already_fetched'
      )
      if (sessionCacheString) {
        checkRevision(JSON.parse(sessionCacheString), localInfo)
        return
      }
      // load revision, check localStorage
      void fetch(origin + '/api/frontend/privacy')
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem(
            'privacy_already_fetched',
            JSON.stringify(data)
          )
          checkRevision(data, localInfo)
        })
        .catch(() => {
          // loading failed, ignore
        })
    } catch (e) {
      //
    }
  }, [show, origin])

  function onButtonClick() {
    localStorage.setItem(
      'consent',
      JSON.stringify({
        revision,
        showEvent: true,
        consentEvent: true,
      })
    )
    setShow(false)
  }

  // TODO This code is not beautiful and needs some love...
  function checkRevision(
    revisionsArray: string[],
    localInfo: LocalStorageData | null
  ) {
    if (!localInfo || localInfo.revision !== revisionsArray[0]) {
      setShow(true)
      setRevision(revisionsArray[0])
    }
  }

  if (!show) return null
  return (
    <CookieWrapper className="cookie-bar">
      {strings.cookie.part1}{' '}
      <CookieLink href={`https://de.${serloDomain}/privacy`} target="_blank">
        {strings.cookie.link1}
      </CookieLink>{' '}
      {strings.cookie.part2}{' '}
      <CookieLink href={`https://de.${serloDomain}/terms`} target="_blank">
        {strings.cookie.link2}
      </CookieLink>{' '}
      {strings.cookie.part3}
      <CookieButton onClick={() => onButtonClick()}>
        {strings.cookie.button}
      </CookieButton>
    </CookieWrapper>
  )
}

const CookieWrapper = styled.div`
  background: ${(props) => props.theme.colors.brand};
  box-sizing: border-box;
  color: white;
  bottom: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  padding: 1.125rem;
  z-index: 1;
`

const CookieButton = styled.button`
  background: ${(props) => props.theme.colors.brandGreen};
  font-size: 1.125rem;
  color: white;
  cursor: pointer;
  border: none;
  margin-left: 1rem;
  padding: 0.425rem 0.975rem;
  outline: none;

  &:hover {
    background: ${(props) => props.theme.colors.linkHoverColor};
  }

  @media (max-width: 1091px) {
    display: block;
    margin: 1rem auto 0;
  }
`

const CookieLink = styled.a`
  color: white;

  &:hover {
    color: ${(props) => props.theme.colors.lighterblue};
  }
`
