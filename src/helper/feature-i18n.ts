import { deInstanceData, deServerSideStrings, deLoggedInData } from '@/data/de'
import {
  enInstanceData,
  enServerSideStrings,
  enInstanceLandingData,
} from '@/data/en'
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
  console.log('load instance data', lang)
  let data = enInstanceData
  if (lang == 'de') {
    console.log('load de instance data')
    data = deInstanceData
  }
  return data
}

export function getServerSideStrings(lang: string) {
  let data = enServerSideStrings
  if (lang == 'de') {
    console.log('load de instance data')
    data = deServerSideStrings
  }
  return data
}

export function getLandingData(_lang: string) {
  return enInstanceLandingData
}

export function getLoggedInData(_lang: string) {
  return deLoggedInData
}
