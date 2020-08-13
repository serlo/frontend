// eslint-disable-next-line import/no-internal-modules
import mergeDeepRight from 'ramda/src/mergeDeepRight'

import {
  instanceData as deInstanceData,
  serverSideStrings as deServerSideStrings,
  loggedInData as deLoggedInData,
} from '@/data/de'
import {
  instanceData as enInstanceData,
  serverSideStrings as enServerSideStrings,
  instanceLandingData as enInstanceLandingData,
  loggedInData as enLoggedInData,
} from '@/data/en'
import {
  instanceData as esInstanceData,
  instanceLandingData as esInstanceLandingData,
  serverSideStrings as esServerSideStrings,
  loggedInData as esLoggedInData,
} from '@/data/es'
import {
  instanceData as frInstanceData,
  serverSideStrings as frServerSideStrings,
  instanceLandingData as frInstanceLandingData,
  loggedInData as frLoggedInData,
} from '@/data/fr'
import {
  instanceData as hiInstanceData,
  serverSideStrings as hiServerSideStrings,
  instanceLandingData as hiInstanceLandingData,
  loggedInData as hiLoggedInData,
} from '@/data/hi'
import {
  instanceData as taInstanceData,
  serverSideStrings as taServerSideStrings,
  loggedInData as taLoggedInData,
  instanceLandingData as taInstanceLandingData,
} from '@/data/ta'
import { Instance } from '@/fetcher/query'

export const languages: Instance[] = ['de', 'en', 'es', 'fr', 'hi', 'ta']

export function parseLanguageSubfolder(alias: string) {
  for (const lang of languages) {
    if (alias.startsWith(`/${lang}/`) || alias == `/${lang}`) {
      const subalias = alias.substring(3)
      return { alias: subalias === '' ? '/' : subalias, instance: lang }
    }
  }
  return { alias, instance: 'de' }
}

export function isOnLanguageSubdomain() {
  if (typeof window === 'undefined') return false
  else {
    for (const lang of languages) {
      if (window.location.host.startsWith(`${lang}.`)) return true
    }
  }
  return false
}

export function getInstanceDataByLang(lang: string) {
  const enData = enInstanceData

  const data =
    lang == 'de'
      ? deInstanceData
      : lang == 'es'
      ? esInstanceData
      : lang == 'fr'
      ? frInstanceData
      : lang == 'ta'
      ? taInstanceData
      : lang == 'hi'
      ? hiInstanceData
      : enInstanceData

  return mergeDeepRight(enData, data) as typeof enInstanceData
}

export function getServerSideStrings(lang: string) {
  const enData = enServerSideStrings

  const data =
    lang == 'de'
      ? deServerSideStrings
      : lang == 'es'
      ? esServerSideStrings
      : lang == 'fr'
      ? frServerSideStrings
      : lang == 'ta'
      ? taServerSideStrings
      : lang == 'hi'
      ? hiServerSideStrings
      : enServerSideStrings

  return mergeDeepRight(enData, data) as typeof enServerSideStrings
}

export function getLandingData(lang: string) {
  const enData = enInstanceLandingData

  //no de, has custom landing page
  const data =
    lang == 'es'
      ? esInstanceLandingData
      : lang == 'fr'
      ? frInstanceLandingData
      : lang == 'ta'
      ? taInstanceLandingData
      : lang == 'hi'
      ? hiInstanceLandingData
      : enInstanceLandingData

  return mergeDeepRight(enData, data) as typeof enInstanceLandingData
}

export function getLoggedInData(lang: string) {
  const enData = enLoggedInData

  const data =
    lang == 'de'
      ? deLoggedInData
      : lang == 'es'
      ? esLoggedInData
      : lang == 'fr'
      ? frLoggedInData
      : lang == 'ta'
      ? taLoggedInData
      : lang == 'hi'
      ? hiLoggedInData
      : enLoggedInData

  return mergeDeepRight(enData, data) as typeof enLoggedInData
}
