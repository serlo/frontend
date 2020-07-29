import { deInstanceData, deServerSideStrings, deLoggedInData } from '@/data/de'
import {
  enInstanceData,
  enServerSideStrings,
  enInstanceLandingData,
  enLoggedInData,
} from '@/data/en'
import {
  esInstanceData,
  esInstanceLandingData,
  esServerSideStrings,
  esLoggedInData,
} from '@/data/es'
import {
  frInstanceData,
  frServerSideStrings,
  frInstanceLandingData,
  frLoggedInData,
} from '@/data/fr'
import {
  hiInstanceData,
  hiServerSideStrings,
  hiInstanceLandingData,
  hiLoggedInData,
} from '@/data/hi'
import {
  taInstanceData,
  taServerSideStrings,
  taLoggedInData,
  taInstanceLandingData,
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
  if (lang == 'en') {
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
