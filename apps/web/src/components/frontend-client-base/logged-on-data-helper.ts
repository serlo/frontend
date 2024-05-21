import Cookies from 'js-cookie'

import { type LoggedInData } from '@/data-types'
import { type Instance } from '@/fetcher/graphql-types/operations'
import { frontendOrigin } from '@/helper/urls/frontent-origin'

export function getCachedLoggedInData(lang: Instance) {
  if (typeof window === 'undefined' || window.location.hostname === 'localhost')
    return null
  const cacheValue = sessionStorage.getItem(`___loggedInData_${lang}`)
  if (!cacheValue) return null
  return JSON.parse(cacheValue) as LoggedInData
}

export function fetchLoggedInData({
  lang,
  setLoggedInData,
}: {
  lang: Instance
  setLoggedInData: (value: LoggedInData) => void
}) {
  const cookies = typeof window === 'undefined' ? {} : Cookies.get()

  fetch(frontendOrigin + '/api/locale/' + lang)
    .then((res) => res.json())
    .then((value) => {
      if (value) {
        sessionStorage.setItem(`___loggedInData_${lang}`, JSON.stringify(value))
        setLoggedInData(value as LoggedInData)
      }
    })
    .catch(() => {})
  if (!cookies['__serlo_preview__']) {
    // bypass cache
    fetch('/api/frontend/preview').catch(() => {})
  }
}
