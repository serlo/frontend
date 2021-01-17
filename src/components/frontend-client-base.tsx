import { useRouter } from 'next/router'
import React from 'react'
import { notify } from 'react-notify-toast'

import { useAuth } from '@/auth/use-auth'
import { InstanceDataProvider } from '@/contexts/instance-context'
import { LoggedInDataProvider } from '@/contexts/logged-in-data-context'
import { ToastNoticeProvider } from '@/contexts/toast-notice-context'
import { InstanceData, LoggedInData } from '@/data-types'
import { PrintStylesheet } from '@/helper/css'
import { getInstanceDataByLang } from '@/helper/feature-i18n'
import { frontendOrigin } from '@/helper/frontent-origin'

export type FrontendClientBaseProps = React.PropsWithChildren<{}>

export const StatsContext = React.createContext<any>(undefined)

export const IdContext = React.createContext<number>(-10000)

export function FrontendClientBase({ children }: FrontendClientBaseProps) {
  const { locale } = useRouter()
  const [instanceData] = React.useState<InstanceData>(() => {
    if (typeof window === 'undefined') {
      // load instance data for server side rendering
      return getInstanceDataByLang(locale!)
    } else {
      // load instance data from client from document tag
      return JSON.parse(
        document.getElementById('__FRONTEND_CLIENT_INSTANCE_DATA__')
          ?.textContent ?? '{}'
      )
    }
  })

  const [statsData, setStatsData] = React.useState(undefined)
  const [useStats] = React.useState(true)

  React.useEffect(() => {
    void (async () => {
      const filekey = localStorage.getItem('experiment_stats_filekey')
      if (filekey) {
        const res = await fetch(
          `https://arrrg.uber.space/serlo-stats/${filekey}.json`
        )
        const json = await res.json()
        setStatsData(json)
      }
    })()
  }, [])

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
    <>
      <PrintStylesheet warning={instanceData.strings.print.warning} />
      <InstanceDataProvider value={instanceData}>
        <LoggedInDataProvider value={loggedInData}>
          <ToastNoticeProvider value={toastNotice}>
            <StatsContext.Provider value={{ statsData, useStats }}>
              {children}
            </StatsContext.Provider>
          </ToastNoticeProvider>
        </LoggedInDataProvider>
      </InstanceDataProvider>
    </>
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
    if (typeof window === 'undefined') return null
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
