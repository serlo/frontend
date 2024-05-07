import type { AuthorizationPayload } from '@serlo/authorization'
import Cookies from 'js-cookie'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { ConditionalWrap } from './conditional-wrap'
import { HeaderFooter } from './header-footer'
import { MaxWidthDiv } from './navigation/max-width-div'
import { AuthProvider } from '@/auth/auth-provider'
import { checkLoggedIn } from '@/auth/cookie/check-logged-in'
import { PrintMode } from '@/components/print-mode'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { UuidsProvider } from '@/contexts/uuids-context'
import { InstanceData, LoggedInData, UuidType } from '@/data-types'
import {
  FixedInstanceData,
  featureI18nForServerOnly,
} from '@/helper/feature-i18n-for-server-only'
import { triggerSentry } from '@/helper/trigger-sentry'
import { frontendOrigin } from '@/helper/urls/frontent-origin'

export interface FrontendClientBaseProps {
  children: JSX.Element | (JSX.Element | null)[]
  noHeaderFooter?: boolean
  noContainers?: boolean
  showNav?: boolean
  entityId?: number
  entityType?: UuidType
  revisionId?: number
  authorization?: AuthorizationPayload
  loadLoggedInData?: boolean
}

Router.events.on('routeChangeStart', (_url, { shallow }) => {
  if (!shallow) NProgress.start()
})
Router.events.on('routeChangeComplete', (url, { shallow }) => {
  NProgress.done()
  // when using csr and running into an error try without csr once
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
  entityType,
  revisionId,
  authorization,
  loadLoggedInData,
}: FrontendClientBaseProps) {
  const { locale } = useRouter()
  const [instanceData] = useState<InstanceData>(() => {
    if (typeof window === 'undefined') {
      // load instance data for server side rendering
      // Note: using require to avoid webpack bundling it
      return featureI18nForServerOnly(locale)
    } else {
      // load instance data from client from document tag
      return JSON.parse(
        document.getElementById('__FRONTEND_CLIENT_INSTANCE_DATA__')
          ?.textContent ?? '{}'
      ) as FixedInstanceData
    }
  })

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

  const [loggedInData, setLoggedInData] = useState<LoggedInData | null>(
    getCachedLoggedInData()
  )

  const isLoggedIn = checkLoggedIn()

  useEffect(fetchLoggedInData, [
    instanceData.lang,
    loggedInData,
    loadLoggedInData,
    isLoggedIn,
    locale,
  ])

  // dev
  //console.dir(initialProps)

  return (
    <InstanceDataProvider value={instanceData}>
      <PrintMode />
      <AuthProvider unauthenticatedAuthorizationPayload={authorization}>
        <LoggedInDataProvider value={loggedInData}>
          <UuidsProvider
            value={{ entity: { entityId, entityType }, revisionId }}
          >
            <Toaster />
            <ConditionalWrap
              condition={!noHeaderFooter}
              wrapper={(kids) => <HeaderFooter>{kids}</HeaderFooter>}
            >
              <ConditionalWrap
                condition={!noContainers}
                wrapper={(kids) => (
                  <div className="relative">
                    <MaxWidthDiv showNav={showNav}>
                      <main id="content">{kids}</main>
                    </MaxWidthDiv>
                  </div>
                )}
              >
                {children}
              </ConditionalWrap>
            </ConditionalWrap>
          </UuidsProvider>
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
    const cacheValue = sessionStorage.getItem(
      `___loggedInData_${instanceData.lang}`
    )
    if (!cacheValue) return null
    return JSON.parse(cacheValue) as LoggedInData
  }

  function fetchLoggedInData() {
    const cookies = typeof window === 'undefined' ? {} : Cookies.get()
    if (loggedInData) return
    if (isLoggedIn || loadLoggedInData) {
      fetch(frontendOrigin + '/api/locale/' + instanceData.lang)
        .then((res) => res.json())
        .then((value) => {
          if (value) {
            sessionStorage.setItem(
              `___loggedInData_${instanceData.lang}`,
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
