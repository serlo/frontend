import { AppProps } from 'next/app'
// eslint-disable-next-line import/no-unassigned-import
import 'core-js/es/object/has-own'

// add font-faces to global css
import '@/assets-webkit/fonts/default.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

import { isRenderedPage } from '@/helper/rendered-page'

export default function App(props: AppProps) {
  const { Component } = props

  if (isRenderedPage(Component)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Component.renderer(props.pageProps, props)
  }

  return <Component {...props.pageProps} />
}
