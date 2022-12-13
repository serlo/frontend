import type { AuthorizationPayload } from '@serlo/authorization'
import Cookies from 'js-cookie'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import { PropsWithChildren, useState, useEffect } from 'react'
import { default as ToastNotice } from 'react-notify-toast'

import { ConditonalWrap } from './conditional-wrap'
import { HeaderFooter } from './header-footer'
import { MaxWidthDiv } from './navigation/max-width-div'
import { AuthProvider } from '@/auth/auth-provider'
import { checkLoggedIn } from '@/auth/cookie/check-logged-in'
import { PrintMode } from '@/components/print-mode'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getInstanceDataByLang } from '@/helper/feature-i18n'
// eslint-disable-next-line no-duplicate-imports
import type { getInstanceDataByLang as InstanceData } from '@/helper/feature-i18n'
import { triggerSentry } from '@/helper/trigger-sentry'
import { frontendOrigin } from '@/helper/urls/frontent-origin'

export type FrontendClientBaseProps = PropsWithChildren<{
  noHeaderFooter?: boolean
  noContainers?: boolean
  showNav?: boolean
  entityId?: number
  authorization?: AuthorizationPayload
  loadLoggedInData?: boolean
}>

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', (url, { shallow }) => {
  NProgress.done()
  // when using csr and running into an error, try without csr once
  if (!shallow && document.getElementById('error-page-description') !== null) {
    triggerSentry({ message: 'trying again without csr' })
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }
})
Router.events.on('routeChangeError', () => NProgress.done())

export function FrontendClientBase({
  children,
  noHeaderFooter,
  noContainers,
  showNav,
  entityId,
  authorization,
  loadLoggedInData,
}: FrontendClientBaseProps) {
  const { locale: routerLocale } = useRouter()
  const locale = (routerLocale as Instance) ?? Instance.De

  useEffect(() => {
    //tiny history
    sessionStorage.setItem(
      'previousPathname',
      sessionStorage.getItem('currentPathname') || ''
    )
    sessionStorage.setItem('currentPathname', window.location.href)
  })

  useEffect(() => {
    // scroll to comment area to start lazy loading
    if (window.location.hash.startsWith('#comment-')) {
      setTimeout(() => {
        document
          .querySelector('#comment-area-begin-scrollpoint')
          ?.scrollIntoView()
      }, 800)
    }
  })

  const isLoggedIn = checkLoggedIn()
  const [loggedInData, setLoggedInData] = useState<LoggedInData | null>(
    getCachedLoggedInData()
  )
  useEffect(fetchLoggedInData, [
    loggedInData,
    loadLoggedInData,
    isLoggedIn,
    locale,
  ])

  // dev
  //console.dir(initialProps)

  const getI18n = () => {
    if (typeof window === 'undefined') {
      // load instance data for server side rendering
      // Note: using require to avoid webpack bundling it
      // const featureI18n = require('@/helper/feature-i18n') as {
      //   getInstanceDataByLang: typeof getInstanceDataByLang
      // }
      // return instanceData
      return getInstanceDataByLang(locale)
    } else {
      // load instance data from client from document tag
      return JSON.parse(
        document.getElementById('__FRONTEND_CLIENT_INSTANCE_DATA__')
          ?.textContent ?? '{}'
      ) as ReturnType<typeof InstanceData>
    }
  }

  return (
    <InstanceDataProvider value={getI18n()}>
      <PrintMode />
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
                      <main id="content">{kids}</main>
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
    </InstanceDataProvider>
  )

  function getCachedLoggedInData() {
    if (
      typeof window === 'undefined' ||
      window.location.hostname === 'localhost'
    )
      return null
    const cacheValue = sessionStorage.getItem(`___loggedInData_${locale}`)
    if (!cacheValue) return null
    return JSON.parse(cacheValue) as LoggedInData
  }

  function fetchLoggedInData() {
    const cookies = typeof window === 'undefined' ? {} : Cookies.get()
    if (loggedInData) return
    if (isLoggedIn || loadLoggedInData) {
      fetch(frontendOrigin + '/api/locale/' + locale)
        .then((res) => res.json())
        .then((value) => {
          if (value) {
            sessionStorage.setItem(
              `___loggedInData_${locale}`,
              JSON.stringify(value)
            )
            setLoggedInData(value as LoggedInData)
          }
        })
        .catch(() => {})
      if (!cookies['__serlo_preview__']) {
        // bypass cache
        fetch('/api/frontend/preview').catch(() => {})
      }
    }
  }
}
