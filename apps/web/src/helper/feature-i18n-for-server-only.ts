import { getInstanceDataByLang } from './feature-i18n'
import { Instance } from '@/fetcher/graphql-types/operations'

// assumes that the lang-strings in the i18n files are actually valid Instance strings
export type FixedInstanceData = ReturnType<typeof getInstanceDataByLang> & {
  lang: Instance
}

export function featureI18nForServerOnly(locale?: string) {
  return getInstanceDataByLang(
    (locale as Instance) ?? Instance.De
  ) as FixedInstanceData
}
