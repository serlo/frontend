import { AuthorizationPayload } from '@serlo/authorization'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { ConditonalWrap } from './conditional-wrap'
import { HeaderFooter } from './header-footer'
import { MaxWidthDiv } from './navigation/max-width-div'
import { ToastNotice } from './toast-notice'
import { useAuthentication } from '@/auth/use-authentication'
import { PrintWarning } from '@/components/content/print-warning'
import { AuthorizationPayloadProvider } from '@/contexts/authorization-payload-context'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInComponentsProvider } from '@/contexts/logged-in-components'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { InstanceData, LoggedInData } from '@/data-types'
import type { getInstanceDataByLang } from '@/helper/feature-i18n'
import { frontendOrigin } from '@/helper/frontent-origin'
import type { LoggedInStuff } from '@/helper/logged-in-stuff-chunk'
import { theme } from '@/theme'

export type FrontendClientBaseProps = React.PropsWithChildren<{
  noHeaderFooter?: boolean
  noContainers?: boolean
  showNav?: boolean
  entityId?: number
  authorization?: AuthorizationPayload
}>

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export function FrontendClientBase({
  children,
  noHeaderFooter,
  noContainers,
  showNav,
  entityId,
  authorization,
}: FrontendClientBaseProps) {
  const { locale } = useRouter()
  const [instanceData] = React.useState<InstanceData>(() => {
    if (typeof window === 'undefined') {
      // load instance data for server side rendering
      // Note: using require to avoid webpack bundling it
      return require('@/helper/feature-i18n').getInstanceDataByLang(locale!)
    } else {
      // load instance data from client from document tag
      return JSON.parse(
        document.getElementById('__FRONTEND_CLIENT_INSTANCE_DATA__')
          ?.textContent ?? '{}'
      ) as ReturnType<typeof getInstanceDataByLang>
    }
  })

  const [authorizationPayload, setAuthorizationPayload] =
    React.useState<AuthorizationPayload | null>(authorization ?? null)

  //React.useEffect(storePageData, [initialProps])

  React.useEffect(() => {
    //tiny history
    sessionStorage.setItem(
      'previousPathname',
      sessionStorage.getItem('currentPathname') || ''
    )
    sessionStorage.setItem('currentPathname', window.location.pathname)
  })

  const auth = useAuthentication()
  const [loggedInData, setLoggedInData] = React.useState<LoggedInData | null>(
    getCachedLoggedInData()
  )
  const [loggedInComponents, setLoggedInComponents] =
    React.useState<LoggedInStuff | null>(null)

  //console.log('Comps', loggedInComponents)

  React.useEffect(fetchLoggedInData, [
    auth,
    instanceData.lang,
    loggedInData,
    loggedInComponents,
    authorizationPayload,
  ])

  React.useEffect(() => {
    if (loggedInComponents && auth && auth.current) {
      const fetch = loggedInComponents.createAuthAwareGraphqlFetch(auth)
      fetch(JSON.stringify({ query: 'query{authorization}' }))
        .then((value) => {
          setAuthorizationPayload(value.authorization)
        })
        .catch(() => {})
    }
  }, [loggedInComponents, auth])

  // dev
  //console.dir(initialProps)

  return (
    <ThemeProvider theme={theme}>
      <PrintWarning warning={instanceData.strings.print.warning} />
      <InstanceDataProvider value={instanceData}>
        <LoggedInComponentsProvider value={loggedInComponents}>
          <AuthorizationPayloadProvider value={authorizationPayload}>
            <LoggedInDataProvider value={loggedInData}>
              <EntityIdProvider value={entityId || null}>
                <ConditonalWrap
                  condition={!noHeaderFooter}
                  wrapper={(kids) => <HeaderFooter>{kids}</HeaderFooter>}
                >
                  <ConditonalWrap
                    condition={!noContainers}
                    wrapper={(kids) => (
                      <div className="relative">
                        <MaxWidthDiv showNav={showNav}>
                          <main>{kids}</main>
                        </MaxWidthDiv>
                      </div>
                    )}
                  >
                    {/* should not be necessary…?*/}
                    {children as JSX.Element}
                  </ConditonalWrap>
                </ConditonalWrap>
                <ToastNotice />
              </EntityIdProvider>
            </LoggedInDataProvider>
          </AuthorizationPayloadProvider>
        </LoggedInComponentsProvider>
      </InstanceDataProvider>
    </ThemeProvider>
  )

  /*
  function storePageData() {
    try {
      const pageData = initialProps?.pageData
      if (pageData) {
        if (pageData.kind === 'single-entity' || pageData.kind === 'taxonomy') {
          if (pageData.cacheKey)
            sessionStorage.setItem(pageData.cacheKey, JSON.stringify(pageData))
        }
      }
    } catch (e) {
      //
    }
  }*/

  function getCachedLoggedInData() {
    if (
      typeof window === 'undefined' ||
      window.location.hostname === 'localhost'
    )
      return null
    const cacheValue = sessionStorage.getItem(
      `___loggedInData_${instanceData.lang}`
    )
    if (!cacheValue) return null
    return JSON.parse(cacheValue) as LoggedInData
  }

  function fetchLoggedInData() {
    if (auth.current) {
      Promise.all([
        !loggedInData
          ? fetch(frontendOrigin + '/api/locale/' + instanceData.lang).then(
              (res) => res.json()
            )
          : false,
        !loggedInComponents ? import('@/helper/logged-in-stuff-chunk') : false,
      ])
        .then((values: any) => {
          if (values[0]) {
            sessionStorage.setItem(
              `___loggedInData_${instanceData.lang}`,
              JSON.stringify(values[0])
            )
            setLoggedInData(values[0])
          }
          if (values[1]) setLoggedInComponents(values[1].Components)
          if (authorizationPayload == null) {
            setAuthorizationPayload({})
          }
        })
        .catch(() => {})
    }
  }
}
