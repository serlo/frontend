import { requestPage } from './request-page'
import { RequestPageData } from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export async function fetchPageData(
  raw_alias: string
): Promise<RequestPageData> {
  const { alias, instance } = parseLanguageSubfolder(raw_alias)
  return await requestPage(alias, instance)
}
