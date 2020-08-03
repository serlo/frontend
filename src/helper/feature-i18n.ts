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
  let data = enInstanceData
  if (lang == 'de') {
    data = deInstanceData
  }
  if (lang == 'es') {
    data = esInstanceData
  }
  if (lang == 'fr') {
    data = frInstanceData
  }
  if (lang == 'ta') {
    data = taInstanceData
  }
  if (lang == 'hi') {
    data = hiInstanceData
  }
  return data
}

export function getServerSideStrings(lang: string) {
  let data = enServerSideStrings
  if (lang == 'de') {
    data = deServerSideStrings
  }
  if (lang == 'es') {
    data = esServerSideStrings
  }
  if (lang == 'fr') {
    data = frServerSideStrings
  }
  if (lang == 'ta') {
    data = taServerSideStrings
  }
  if (lang == 'hi') {
    data = hiServerSideStrings
  }
  return data
}

export function getLandingData(lang: string) {
  let data = enInstanceLandingData
  // no de
  if (lang == 'es') {
    data = esInstanceLandingData
  }
  if (lang == 'fr') {
    data = frInstanceLandingData
  }
  if (lang == 'ta') {
    data = taInstanceLandingData
  }
  if (lang == 'hi') {
    data = hiInstanceLandingData
  }
  return data
}

export function getLoggedInData(lang: string) {
  let data = deLoggedInData
  if (lang == 'en') {
    data = enLoggedInData
  }
  if (lang == 'es') {
    data = esLoggedInData
  }
  if (lang == 'fr') {
    data = frLoggedInData
  }
  if (lang == 'ta') {
    data = taLoggedInData
  }
  if (lang == 'hi') {
    data = hiLoggedInData
  }
  return data
}
