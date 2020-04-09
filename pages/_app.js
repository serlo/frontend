import React from 'react'
import App from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../public/fonts/karmilla.css'
import '../public/fonts/katex/katex.css'

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from '../src/theme'

const FontRewrite = createGlobalStyle`
  html, body, input, button {
    font-family: '${props => props.font}', sans-serif !important;
    letter-spacing: ${props => props.spacing} !important;
  }
`

class MyApp extends App {
  render() {
    let fontFamily = 'Karmilla'
    let letterSpacing = '-0.007em'

    if (process.browser) {
      let params = new URLSearchParams(window.location.search)
      fontFamily = params.get('font') ? params.get('font') : 'Karmilla'
      letterSpacing = params.get('spacing') ? params.get('spacing') + 'em' : '0'

      var linkElem = document.createElement('link')
      linkElem.rel = 'stylesheet'
      linkElem.href =
        'https://fonts.googleapis.com/css2?family=' +
        fontFamily +
        ':wght@400;700&display=swap'
      var s = document.getElementsByTagName('link')[0]
      s.parentNode.insertBefore(linkElem, s)
    }

    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <FontRewrite font={fontFamily} spacing={letterSpacing} />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default MyApp
