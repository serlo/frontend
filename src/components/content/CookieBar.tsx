import React from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'

export default function CookieBar() {
  const [cookies, setCookie] = useCookies(['consent'])
  let showCookieBar = cookies.consent

  function accept() {
    const newDate = new Date()
    const day = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()

    setCookie(
      'consent',
      `${year}-${month < 10 ? `0${month}` : `${month}`}-${day}`
    )
  }

  if (!showCookieBar) return null
  return (
    <CookieWrapper>
      Mit der Nutzung dieser Webseite erklärst du dich mit unserer
      <CookieLink href="https://de.serlo.org/privacy" target="_blank">
        Datenschutzerklärung
      </CookieLink>{' '}
      und
      <CookieLink href="https://de.serlo.org/terms" target="_blank">
        Nutzungsbedingungen
      </CookieLink>{' '}
      einverstanden.
      <CookieButton onClick={accept}>Verstanden</CookieButton>
    </CookieWrapper>
  )
}

const CookieWrapper = styled.div`
  background: ${props => props.theme.colors.brand};
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
  background: ${props => props.theme.colors.brandGreen};
  font-size: 1.125rem;
  color: white;
  cursor: pointer;
  border: none;
  margin-left: 1rem;
  padding: 0.425rem 0.975rem;
  outline: none;

  &:hover {
    background: ${props => props.theme.colors.linkHoverColor};
  }

  @media (max-width: 1091px) {
    display: block;
    margin: 1rem auto 0;
  }
`

const CookieLink = styled.a`
  color: white;

  &:hover {
    color: ${props => props.theme.colors.lighterblue};
  }
`
