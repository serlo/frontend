import { config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/no-internal-modules
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

// We are adding these styles for fonts and to fontawesome (because it's not integrated in our SSR)
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

import { isRenderedPage } from '@/helper/rendered-page'

// Not adding fontawesome styles again
config.autoAddCss = false

export default function App(props: AppProps) {
  const { Component } = props

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={props.pageProps.session}>
      {isRenderedPage(Component) ? (
        Component.renderer(props.pageProps, props)
      ) : (
        <Component {...props.pageProps} />
      )}
    </SessionProvider>
  )
}
