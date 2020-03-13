import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../public/fonts/karmilla.css'
import '../public/fonts/katex/katex.css'

import { GlobalStyle } from '../src/globalstyles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/theme'

Router.events.on('routeChangeStart', () => {
  console.log('route change start')
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  console.log('route change end')
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp
