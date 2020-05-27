import fetch from 'isomorphic-unfetch'
import React from 'react'
import styled from 'styled-components'

export function CookieBar() {
  const [loaded, setLoaded] = React.useState(false)
  const [revision, setRevision] = React.useState(undefined)

  React.useEffect(() => {
    // load revision, check localStorage
    void fetch(
      window.location.protocol +
        '//' +
        window.location.host +
        '/api/frontend/privacy'
    )
      .then((res) => res.json())
      .then((data) => {
        const localInfo = localStorage.getItem('consent')
        const json = localInfo ? JSON.parse(localInfo) : {}
        if (json.revision !== data[0]) {
          setLoaded(true)
          setRevision(data[0])
        }
      })
  }, [loaded])

  if (!loaded) return null
  return (
    <CookieWrapper>
      Mit der Nutzung dieser Webseite erklärst du dich mit unserer{' '}
      <CookieLink href="https://de.serlo.org/privacy" target="_blank">
        Datenschutzerklärung
      </CookieLink>{' '}
      und{' '}
      <CookieLink href="https://de.serlo.org/terms" target="_blank">
        Nutzungsbedingungen
      </CookieLink>{' '}
      einverstanden.
      <CookieButton
        onClick={() => {
          localStorage.setItem(
            'consent',
            JSON.stringify({ revision, showEvent: true, consentEvent: true })
          )
          setLoaded(false)
        }}
      >
        Verstanden
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
