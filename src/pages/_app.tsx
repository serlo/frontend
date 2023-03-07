import { AppProps } from 'next/app'

// add font-faces to global css
import '@/assets-webkit/fonts/default.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

import { isRenderedPage } from '@/helper/rendered-page'

// polyfill to make future available now
if (!Object.hasOwn) {
  Object.defineProperty(Object, 'hasOwn', {
    value: function (object: object, property: PropertyKey) {
      if (object === null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property)
    },
    configurable: true,
    enumerable: false,
    writable: true,
  })
}

export default function App(props: AppProps) {
  const { Component } = props

  if (isRenderedPage(Component)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Component.renderer(props.pageProps, props)
  }

  return <Component {...props.pageProps} />
}
