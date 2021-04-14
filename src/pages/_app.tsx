import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'

// We are adding these styles for fonts and to fontawesome (because it's not integrated in our SSR)
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/tailwind.css'
import '@/assets-webkit/styles/serlo-css-hacks.css'

import { isRenderedPage } from '@/helper/rendered-page'

// Not adding fontawesome styles again
config.autoAddCss = false

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  if (isRenderedPage(Component)) {
    return Component.renderer(pageProps, props)
  }

  return <Component {...pageProps} />
}
