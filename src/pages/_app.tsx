import { config } from '@fortawesome/fontawesome-svg-core'
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr'
import cookie from 'cookie'
import { IncomingMessage } from 'http'
import { AppContext, AppProps } from 'next/app'

// We are adding these styles for fonts and to fontawesome (because it's not integrated in our SSR)
// eslint-disable-next-line import/no-unassigned-import
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/assets-webkit/fonts/karmilla.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

import { isRenderedPage } from '@/helper/rendered-page'

// Not adding fontawesome styles again
config.autoAddCss = false


// TODO: should maybe go to frontend-client-base
interface InitialProps {
  cookies: unknown
}

function App(props: AppProps & InitialProps) {
  const { Component, cookies } = props
  const keycloakCfg = {
    url: 'https://keycloak.serlo-staging.dev/auth',
    realm: 'serlo',
    clientId: 'frontend', 
  }

  if (isRenderedPage(Component)) {
    return (
      // TODO: should maybe go to frontend-client-base
      <SSRKeycloakProvider
        keycloakConfig={keycloakCfg}
        persistor={SSRCookies(cookies)}
      >
        {Component.renderer(props.pageProps, props)}
      </SSRKeycloakProvider>
    )
  }

  return (
    // TODO: should maybe go to frontend-client-base
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
    >
      <Component {...props.pageProps} />
    </SSRKeycloakProvider>
  )
}

// TODO: should maybe go to frontend-client-base
function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

// TODO: should maybe go to frontend-client-base
App.getInitialProps = async (context: AppContext) => {
  return {
    cookies: parseCookies(context?.ctx?.req),
  }
}

export default App
