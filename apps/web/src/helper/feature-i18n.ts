import { mergeDeepRight } from 'ramda'

import {
  instanceData as deInstanceData,
  instanceLandingData as deInstanceLandingData,
  serverSideStrings as deServerSideStrings,
  loggedInData as deLoggedInData,
  kratosMailStrings as deKratosMailStrings,
} from '@/data/de'
import {
  instanceData as enInstanceData,
  serverSideStrings as enServerSideStrings,
  instanceLandingData as enInstanceLandingData,
  loggedInData as enLoggedInData,
  kratosMailStrings as enKratosMailStrings,
} from '@/data/en'
import {
  instanceData as esInstanceData,
  instanceLandingData as esInstanceLandingData,
  serverSideStrings as esServerSideStrings,
  loggedInData as esLoggedInData,
  kratosMailStrings as esKratosMailStrings,
} from '@/data/es'
import {
  instanceData as frInstanceData,
  serverSideStrings as frServerSideStrings,
  instanceLandingData as frInstanceLandingData,
  loggedInData as frLoggedInData,
  kratosMailStrings as frKratosMailStrings,
} from '@/data/fr'
import {
  instanceData as hiInstanceData,
  serverSideStrings as hiServerSideStrings,
  instanceLandingData as hiInstanceLandingData,
  loggedInData as hiLoggedInData,
  kratosMailStrings as hiKratosMailStrings,
} from '@/data/hi'
import {
  instanceData as taInstanceData,
  serverSideStrings as taServerSideStrings,
  loggedInData as taLoggedInData,
  instanceLandingData as taInstanceLandingData,
  kratosMailStrings as taKratosMailStrings,
} from '@/data/ta'
import { type InstanceData, UuidWithRevType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'

const languages: Instance[] = Object.values(Instance)

export function parseLanguageSubfolder(alias: string) {
  for (const lang of languages) {
    if (alias.startsWith(`/${lang}/`) || alias === `/${lang}`) {
      const subalias = alias.substring(3)
      return { alias: subalias === '' ? '/' : subalias, instance: lang }
    }
  }
  return { alias, instance: Instance.De }
}

export function getInstanceDataByLang(lang: Instance) {
  const enData = enInstanceData

  const data =
    lang === Instance.De
      ? deInstanceData
      : lang === Instance.Es
        ? esInstanceData
        : lang === Instance.Fr
          ? frInstanceData
          : lang === Instance.Ta
            ? taInstanceData
            : lang === Instance.Hi
              ? hiInstanceData
              : enInstanceData

  return mergeDeepRight(enData, data) as InstanceData
}

export function getServerSideStrings(lang: string) {
  const enData = enServerSideStrings

  const data =
    lang === Instance.De
      ? deServerSideStrings
      : lang === Instance.Es
        ? esServerSideStrings
        : lang === Instance.Fr
          ? frServerSideStrings
          : lang === Instance.Ta
            ? taServerSideStrings
            : lang === Instance.Hi
              ? hiServerSideStrings
              : enServerSideStrings

  return mergeDeepRight(enData, data)
}

export function getLandingData(lang: string) {
  const enData = enInstanceLandingData

  const data =
    lang === Instance.De
      ? deInstanceLandingData
      : lang === Instance.Es
        ? esInstanceLandingData
        : lang === Instance.Fr
          ? frInstanceLandingData
          : lang === Instance.Ta
            ? taInstanceLandingData
            : lang === Instance.Hi
              ? hiInstanceLandingData
              : enInstanceLandingData

  return mergeDeepRight(enData, data)
}

export function getLoggedInData(lang: string) {
  const enData = enLoggedInData

  const data =
    lang === Instance.De
      ? deLoggedInData
      : lang === Instance.Es
        ? esLoggedInData
        : lang === Instance.Fr
          ? frLoggedInData
          : lang === Instance.Ta
            ? taLoggedInData
            : lang === Instance.Hi
              ? hiLoggedInData
              : enLoggedInData

  return mergeDeepRight(enData, data)
}

export function getKratosMailStrings(lang: string) {
  const enData = enKratosMailStrings

  const data =
    lang === Instance.De
      ? deKratosMailStrings
      : lang === Instance.Es
        ? esKratosMailStrings
        : lang === Instance.Fr
          ? frKratosMailStrings
          : lang === Instance.Ta
            ? taKratosMailStrings
            : lang === Instance.Hi
              ? hiKratosMailStrings
              : enKratosMailStrings

  return mergeDeepRight(enData, data)
}

export function getEntityStringByTypename(
  typename: UuidWithRevType | undefined,
  strings: InstanceData['strings']
) {
  const typenameNoRevs = typename?.replace('Revision', '')
  const lookup = {
    Page: strings.entities.page,
    Article: strings.entities.article,
    Video: strings.entities.video,
    Applet: strings.entities.applet,
    Exercise: strings.entities.exercise,
    ExerciseGroup: strings.entities.exerciseGroup,
    Event: strings.entities.event,
    Course: strings.entities.course,
    TaxonomyTerm: strings.entities.taxonomyTerm,
    Solution: strings.entities.solution,
    User: strings.entities.user,
    Comment: strings.entities.comment,
    fallback: strings.entities.content,
  }

  if (typenameNoRevs && typenameNoRevs in lookup) {
    return lookup[typenameNoRevs as keyof typeof lookup]
  }
  return lookup.fallback
}
