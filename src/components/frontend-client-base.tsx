import { useRouter } from 'next/router'
import React from 'react'
import { notify } from 'react-notify-toast'
import { ThemeProvider } from 'styled-components'

import { ConditonalWrap } from './conditional-wrap'
import { HeaderFooter } from './header-footer'
import { MaxWidthDiv } from './navigation/max-width-div'
import { NProgressRouter } from './navigation/n-progress-router'
import { RelativeContainer } from './navigation/relative-container'
import { ToastNotice } from './toast-notice'
import { useAuth } from '@/auth/use-auth'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { ToastNoticeProvider } from '@/contexts/toast-notice-context'
import { InstanceData, LoggedInData } from '@/data-types'
import { FontFix, PrintStylesheet } from '@/helper/css'
import { frontendOrigin } from '@/helper/frontent-origin'
import { theme } from '@/theme'

export type FrontendClientBaseProps = React.PropsWithChildren<{
  noHeaderFooter?: boolean
  noContainers?: boolean
  showNav?: boolean
}>

export function FrontendClientBase({
  children,
  noHeaderFooter,
  noContainers,
  showNav,
}: FrontendClientBaseProps) {
  const { locale } = useRouter()
  const [instanceData] = React.useState<InstanceData>(() => {
    if (typeof window === 'undefined') {
      // load instance data for server side rendering
      // Note: using requrie to avoid webpack bundling it
      return require('@/helper/feature-i18n').getInstanceDataByLang(locale!)
    } else {
      // load instance data from client from document tag
      return JSON.parse(
        document.getElementById('__FRONTEND_CLIENT_INSTANCE_DATA__')
          ?.textContent ?? '{}'
      )
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

  const auth = useAuth()
  const [loggedInData, setLoggedInData] = React.useState<LoggedInData | null>(
    getCachedLoggedInData()
  )

  React.useEffect(fetchLoggedInData, [auth, instanceData.lang, loggedInData])

  const toastNotice = notify.createShowQueue()

  // dev
  //console.dir(initialProps)

  return (
    <NProgressRouter>
      <ThemeProvider theme={theme}>
        <FontFix />
        <PrintStylesheet warning={instanceData.strings.print.warning} />
        <InstanceDataProvider value={instanceData}>
          <LoggedInDataProvider value={loggedInData}>
            <ToastNoticeProvider value={toastNotice}>
              <ConditonalWrap
                condition={!noHeaderFooter}
                wrapper={(kids) => <HeaderFooter>{kids}</HeaderFooter>}
              >
                <ConditonalWrap
                  condition={!noContainers}
                  wrapper={(kids) => (
                    <RelativeContainer>
                      <MaxWidthDiv showNav={showNav}>
                        <main>{kids}</main>
                      </MaxWidthDiv>
                    </RelativeContainer>
                  )}
                >
                  {/* should not be necessary…?*/}
                  {children as JSX.Element}
                </ConditonalWrap>
              </ConditonalWrap>
              <ToastNotice />
            </ToastNoticeProvider>
          </LoggedInDataProvider>
        </InstanceDataProvider>
      </ThemeProvider>
    </NProgressRouter>
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
    if (auth.current && !loggedInData) {
      void (async () => {
        const res = await fetch(
          frontendOrigin + '/api/locale/' + instanceData.lang
        )
        const json = (await res.json()) as LoggedInData
        sessionStorage.setItem(
          `___loggedInData_${instanceData.lang}`,
          JSON.stringify(json)
        )
        setLoggedInData(json)
      })()
    }
  }
}
