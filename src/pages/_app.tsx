import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'
import React from 'react'

// We are adding these styles for fonts and to fontawesome (because it's not integrated in our SSR)
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'

// Not adding fontawesome styles again
config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
