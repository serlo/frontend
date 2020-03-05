import React from 'react'
import App from 'next/app'

import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { myLibrary } from '../src/iconlibrary'
import { GlobalStyle } from '../src/globalstyles'
import { BreakpointProvider } from 'react-socks'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/theme'

library.add.apply(library, myLibrary())

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyle />
        <BreakpointProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </BreakpointProvider>
      </>
    )
  }
}

export default MyApp
