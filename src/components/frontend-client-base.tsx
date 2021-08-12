import { AuthorizationPayload } from '@serlo/authorization'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { ConditonalWrap } from './conditional-wrap'
import { HeaderFooter } from './header-footer'
import { MaxWidthDiv } from './navigation/max-width-div'
import { ToastNotice } from './toast-notice'
import { AuthProvider } from '@/auth/auth-provider'
import { PrintMode } from '@/components/print-mode'
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
      const featureI18n = require('@/helper/feature-i18n') as {
        getInstanceDataByLang: typeof getInstanceDataByLang
      }
      return featureI18n.getInstanceDataByLang(locale!)
    } else {
      // load instance data from client from document tag
      return JSON.parse(
        document.getElementById('__FRONTEND_CLIENT_INSTANCE_DATA__')
          ?.textContent ?? '{}'
      ) as ReturnType<typeof getInstanceDataByLang>
    }
  })

  //React.useEffect(storePageData, [initialProps])

  React.useEffect(() => {
    //tiny history
    sessionStorage.setItem(
      'previousPathname',
      sessionStorage.getItem('currentPathname') || ''
    )
    sessionStorage.setItem('currentPathname', window.location.pathname)
  })

  // const auth = useAuthentication('frontend-client-base')
  const [loggedInData, setLoggedInData] = React.useState<LoggedInData | null>(
    getCachedLoggedInData()
  )
  const [loggedInComponents, setLoggedInComponents] =
    React.useState<LoggedInStuff | null>(null)

  //console.log('Comps', loggedInComponents)

  React.useEffect(fetchLoggedInData, [
    instanceData.lang,
    loggedInData,
    loggedInComponents,
  ])

  // dev
  //console.dir(initialProps)

  return (
    <ThemeProvider theme={theme}>
      <InstanceDataProvider value={instanceData}>
        <PrintMode />
        <LoggedInComponentsProvider value={loggedInComponents}>
          <AuthProvider unauthenticatedAuthorizationPayload={authorization}>
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
          </AuthProvider>
        </LoggedInComponentsProvider>
      </InstanceDataProvider>
    </ThemeProvider>
  )

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
    Promise.all([
      !loggedInData
        ? fetch(frontendOrigin + '/api/locale/' + instanceData.lang).then(
            (res) => res.json()
          )
        : false,
      !loggedInComponents ? import('@/helper/logged-in-stuff-chunk') : false,
    ])
      .then((values) => {
        if (values[0]) {
          sessionStorage.setItem(
            `___loggedInData_${instanceData.lang}`,
            JSON.stringify(values[0])
          )
          setLoggedInData(values[0])
        }
        if (values[1])
          setLoggedInComponents(
            (values[1] as { Components: LoggedInStuff }).Components
          )
      })
      .catch(() => {})
  }
}
