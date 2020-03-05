import Header from './header'
import React from 'react'
import { createGlobalStyle } from 'styled-components'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

export default function Main(props) {
  return (
    <>
      <GlobalStyle />
      <Header />
    </>
  )
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Karmilla';
  }
  @font-face {
    font-family: 'Karmilla';
    font-style: normal;
    font-weight: 400;
    src: url('/karmilla-regular.woff2') format('woff2'),
      url('/karmilla-regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Karmilla';
    font-style: normal;
    font-weight: 700;
    src: url('/karmilla-bold.woff2') format('woff2'),
      url('/karmilla-bold.woff') format('woff');
  }
`
