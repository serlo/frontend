import { getInstanceDataByLang } from './feature-i18n'
import { FixedInstanceData } from '@/components/frontend-client-base'
import { Instance } from '@/fetcher/graphql-types/operations'

export function featureI18nForServerOnly(locale?: string) {
  return getInstanceDataByLang(
    (locale as Instance) ?? Instance.De
  ) as FixedInstanceData
}
